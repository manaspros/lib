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
    linkedin: headers.indexOf('LinkedIn'),
    
    // Education columns - PhD
    phdDegree: headers.indexOf('Education (PhD)'),
    phdInstitution: headers.findIndex(h => h && h.includes('Education (PhD)')) + 1,
    phdYear: headers.findIndex(h => h && h.includes('Education (PhD)')) + 2,
    
    // Education columns - Masters  
    mastersDegree: headers.indexOf('Education (MTech/MS)'),
    mastersInstitution: headers.findIndex(h => h && h.includes('Education (MTech/MS)')) + 1,
    mastersYear: headers.findIndex(h => h && h.includes('Education (MTech/MS)')) + 2,
    
    // Education columns - Bachelors
    bachelorsDegree: headers.indexOf('Education (BTech/BE)'),
    bachelorsInstitution: headers.findIndex(h => h && h.includes('Education (BTech/BE)')) + 1,
    bachelorsYear: headers.findIndex(h => h && h.includes('Education (BTech/BE)')) + 2
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

  // Helper function to process image URL from local assets
  const processImageUrl = (imageUrl, personName) => {
    if (!personName) return '/api/placeholder/300/300';
    
    // Create a standardized filename from the person's name
    const filename = personName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .replace(/\s+/g, '-')
      .trim();

    console.log(`Processing image for ${personName}: ${filename}`);
    
    // For Vite, we need to import the image or use a dynamic import
    // For now, we'll create the path that works with Vite's asset handling
    // The assets will need to be moved to public folder or properly imported
    try {
      // Try to construct the path for assets in public folder
      return `/assets/${filename}.png`;
    } catch (error) {
      console.warn(`Image not found for ${personName}, using placeholder`);
      return '/api/placeholder/300/300';
    }
  };

  // Helper function to build education info
  const buildEducation = (row, degreeIndex, instIndex, yearIndex) => {
    const degree = getCellValue(row, degreeIndex);
    const institution = getCellValue(row, instIndex); 
    const year = getCellValue(row, yearIndex);
    
    if (degree || institution || year) {
      return { degree, institution, year };
    }
    return null;
  };

  // Helper function to create bio from available data
  const createBio = (person) => {
    const parts = [];
    
    if (person.postAffiliation) {
      parts.push(`Currently at ${person.postAffiliation}.`);
    }
    
    if (person.research && person.research.length > 0) {
      parts.push(`Specializes in ${person.research.join(', ')}.`);
    }
    
    if (person.education?.phd?.institution) {
      parts.push(`Completed PhD from ${person.education.phd.institution}.`);
    }
    
    return parts.length > 0 ? parts.join(' ') : `${person.title} with expertise in various research areas.`;
  };

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
      image: processImageUrl(getCellValue(row, headerMap.photo), name),
      Photo: processImageUrl(getCellValue(row, headerMap.photo), name),
      research: parseResearch(getCellValue(row, headerMap.research)),
      email: getCellValue(row, headerMap.email),
      postAffiliation: getCellValue(row, headerMap.postAffiliation),
      linkedin: getCellValue(row, headerMap.linkedin),
      education: {
        phd: buildEducation(row, headerMap.phdDegree, headerMap.phdInstitution, headerMap.phdYear),
        masters: buildEducation(row, headerMap.mastersDegree, headerMap.mastersInstitution, headerMap.mastersYear),
        bachelors: buildEducation(row, headerMap.bachelorsDegree, headerMap.bachelorsInstitution, headerMap.bachelorsYear)
      }
    };

    // Add bio
    person.bio = createBio(person);

    // Categorize based on title
    if (title === 'professor') {
      transformedData.professor.push(person);
    } else if (title === 'post-doctoral researcher') {
      transformedData.postdoc.push(person);
    } else if (title === 'ph.d') {
      transformedData.phd.push(person);
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

