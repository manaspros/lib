// Google Sheets API service
import { FALLBACK_TEAM_DATA } from '../utils/fallbackData';

const SHEET_ID = '1rfeP7ny6xYqEe-5fVLqKpXLHGI2rGeQ8oZK0us6ADtE';
const SHEET_NAME = 'People';
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;

/**
 * Fetch data from Google Sheets
 * @param {string} range - The range to fetch (e.g., 'A1:Z100')
 * @returns {Promise<Array>} Array of row data
 */
export const fetchSheetData = async (range = 'A:Z') => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}!${range}?key=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.values || [];
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    throw error;
  }
};

/**
 * Transform raw sheet data into structured team data
 * @param {Array} rawData - Raw data from Google Sheets
 * @returns {Object} Structured team data
 */
export const transformSheetData = (rawData) => {
  if (!rawData || rawData.length === 0) {
    return { 
      professor: [], 
      postdoc: [], 
      phd: [], 
      juniorResearcher: [], 
      masters: [], 
      webmaster: [], 
      alumni: [], 
      graduateStudent: [], 
      others: [] 
    };
  }

  // First row is headers
  const headers = rawData[0];
  const rows = rawData.slice(1);

  // Map headers to indices for easier access
  const headerMap = {
    title: headers.indexOf('Title'),
    name: headers.indexOf('Name'),
    photo: headers.indexOf('Photo'),
    research: headers.indexOf('Research Interests/Project'),
    email: headers.indexOf('Email'),
    postAffiliation: headers.indexOf('Post & Current Affiliation'),
    phdEducation: headers.indexOf('Education (PhD)'),
    phdInstitution: headers.indexOf('Institutaion'), // Note: keeping original spelling from sheet
    phdYear: headers.indexOf('Year'),
    mtechEducation: headers.indexOf('Education (MTech/MS)'),
    mtechInstitution: headers.indexOf('Institutaion'), // This might be a different column
    mtechYear: headers.indexOf('Year'), // This might be a different column
    btechEducation: headers.indexOf('Education (BTech/BE)'),
    btechInstitution: headers.indexOf('Institutaion'), // This might be a different column
    btechYear: headers.indexOf('Year') // This might be a different column
  };

  // Helper function to safely get cell value
  const getCellValue = (row, index) => {
    return index >= 0 && index < row.length ? row[index] || '' : '';
  };

  // Helper function to parse research interests
  const parseResearch = (researchString) => {
    if (!researchString) return [];
    return researchString.split(/[,;]/).map(item => item.trim()).filter(item => item);
  };

  // Helper function to validate and process image URL
  const processImageUrl = (imageUrl) => {
    if (!imageUrl) return '/api/placeholder/300/300';
    
    // If it's a Google Drive link, convert to direct image URL
    if (imageUrl.includes('drive.google.com')) {
      const fileIdMatch = imageUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (fileIdMatch) {
        return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
      }
    }
    
    // Return the URL as is if it's already a direct image URL
    return imageUrl || '/api/placeholder/300/300';
  };

  // Helper function to build education info
  const buildEducation = (row, eduIndex, instIndex, yearIndex) => {
    const education = getCellValue(row, eduIndex);
    const institution = getCellValue(row, instIndex);
    const year = getCellValue(row, yearIndex);
    
    if (education || institution || year) {
      return { degree: education, institution, year };
    }
    return null;
  };

  // Correct column mapping for education (assuming the sheet has these columns in order)
  const getEducationColumns = (headers) => {
    // Find education-related columns
    const phdIndex = headers.findIndex(h => h && h.toLowerCase().includes('phd'));
    const mastersIndex = headers.findIndex(h => h && (h.toLowerCase().includes('mtech') || h.toLowerCase().includes('ms')));
    const bachelorsIndex = headers.findIndex(h => h && (h.toLowerCase().includes('btech') || h.toLowerCase().includes('be')));
    
    return {
      phd: {
        education: phdIndex,
        institution: phdIndex > -1 ? phdIndex + 1 : -1,
        year: phdIndex > -1 ? phdIndex + 2 : -1
      },
      masters: {
        education: mastersIndex,
        institution: mastersIndex > -1 ? mastersIndex + 1 : -1,
        year: mastersIndex > -1 ? mastersIndex + 2 : -1
      },
      bachelors: {
        education: bachelorsIndex,
        institution: bachelorsIndex > -1 ? bachelorsIndex + 1 : -1,
        year: bachelorsIndex > -1 ? bachelorsIndex + 2 : -1
      }
    };
  };

  const eduColumns = getEducationColumns(headers);

  const transformedData = {
    professor: [],
    postdoc: [],
    phd: [],
    juniorResearcher: [],
    masters: [],
    webmaster: [],
    alumni: [],
    graduateStudent: [],
    others: []
  };

  rows.forEach((row) => {
    if (!row || row.length === 0) return;

    const title = getCellValue(row, headerMap.title).toLowerCase().trim();
    const name = getCellValue(row, headerMap.name);
    
    if (!name) return; // Skip rows without names

    const person = {
      name,
      title: getCellValue(row, headerMap.title),
      image: processImageUrl(getCellValue(row, headerMap.photo)),
      research: parseResearch(getCellValue(row, headerMap.research)),
      email: getCellValue(row, headerMap.email),
      postAffiliation: getCellValue(row, headerMap.postAffiliation),
      education: {
        phd: buildEducation(row, eduColumns.phd.education, eduColumns.phd.institution, eduColumns.phd.year),
        masters: buildEducation(row, eduColumns.masters.education, eduColumns.masters.institution, eduColumns.masters.year),
        bachelors: buildEducation(row, eduColumns.bachelors.education, eduColumns.bachelors.institution, eduColumns.bachelors.year)
      }
    };

    // Categorize based on exact title matches
    if (title === 'professor') {
      transformedData.professor.push({
        ...person,
        bio: person.postAffiliation || `${person.title} with expertise in ${person.research.join(', ')}.`,
        website: '' // Add website if available in sheet
      });
    } else if (title === 'post-doctoral researcher') {
      transformedData.postdoc.push(person);
    } else if (title === 'ph.d') {
      transformedData.phd.push({
        ...person,
        year: person.education.phd?.year || 'Current'
      });
    } else if (title === 'junior research fellow') {
      transformedData.juniorResearcher.push(person);
    } else if (title === 'master student') {
      transformedData.masters.push(person);
    } else if (title === 'web master') {
      transformedData.webmaster.push(person);
    } else if (title === 'alumni') {
      transformedData.alumni.push(person);
    } else if (title === 'graduate student') {
      transformedData.graduateStudent.push(person);
    } else {
      transformedData.others.push(person);
    }
  });

  return transformedData;
};

/**
 * Get team data from Google Sheets
 * @returns {Promise<Object>} Structured team data
 */
export const getTeamData = async () => {
  // Check if API key is configured
  if (!API_KEY || API_KEY === 'your_google_sheets_api_key_here') {
    console.warn('Google Sheets API key not configured, using fallback data');
    return FALLBACK_TEAM_DATA;
  }

  try {
    const rawData = await fetchSheetData();
    const transformedData = transformSheetData(rawData);
    
    // If no data was retrieved, use fallback
    if (transformedData.professor.length === 0 && 
        transformedData.postdoc.length === 0 && 
        transformedData.phd.length === 0 &&
        transformedData.masters.length === 0) {
      console.warn('No data retrieved from Google Sheets, using fallback data');
      return FALLBACK_TEAM_DATA;
    }
    
    return transformedData;
  } catch (error) {
    console.error('Error getting team data, using fallback:', error);
    return FALLBACK_TEAM_DATA;
  }
};
