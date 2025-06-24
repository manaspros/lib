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
    phdInstitution: headers.indexOf('Education (PhD)') + 1, // Next column after PhD
    phdYear: headers.indexOf('Education (PhD)') + 2, // Two columns after PhD
    mtechEducation: headers.indexOf('Education (MTech/MS)'),
    mtechInstitution: headers.indexOf('Education (MTech/MS)') + 1, // Next column after MTech
    mtechYear: headers.indexOf('Education (MTech/MS)') + 2, // Two columns after MTech
    btechEducation: headers.indexOf('Education (BTech/BE)'),
    btechInstitution: headers.indexOf('Education (BTech/BE)') + 1 // Next column after BTech
  };

  // Helper function to safely get cell value
  const getCellValue = (row, index) => {
    return index >= 0 && index < row.length ? row[index] || '' : '';
  };

  // Helper function to parse research interests
  const parseResearch = (researchString) => {
    if (!researchString) return [];
    return researchString.split(/[,;]/).map(item => item.trim()).filter(item => item);
  };  // Helper function to validate and process image URL
  const processImageUrl = (imageUrl, personName) => {
    // Always use local assets instead of Google Sheets images
    if (personName) {
      // Create a standardized filename from the person's name
      const filename = personName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/gi, '')
        .replace(/\s+/g, '-')
        .trim();
      
      // Try common image extensions
      const possiblePaths = [
        `/src/assets/team/${filename}.jpg`,
        `/src/assets/team/${filename}.jpeg`,
        `/src/assets/team/${filename}.png`,
        `/src/assets/team/${filename}.webp`,
        `/src/assets/people/${filename}.jpg`,
        `/src/assets/people/${filename}.jpeg`,
        `/src/assets/people/${filename}.png`,
        `/src/assets/people/${filename}.webp`,
        `/src/assets/${filename}.jpg`,
        `/src/assets/${filename}.jpeg`,
        `/src/assets/${filename}.png`,
        `/src/assets/${filename}.webp`
      ];
      
      // Return the first possible path (we'll handle fallbacks in the component)
      return possiblePaths[0];
    }
    
    // Fallback to placeholder if no name provided
    return '/api/placeholder/300/300';
  };
  // Helper function to build education info using the correct column mapping
  const buildEducation = (row, eduIndex, instIndex, yearIndex) => {
    const education = getCellValue(row, eduIndex);
    const institution = getCellValue(row, instIndex);
    const year = getCellValue(row, yearIndex);
    
    if (education || institution || year) {
      return { degree: education, institution, year };
    }
    return null;
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
    const photoValue = getCellValue(row, headerMap.photo);
    
    if (!name) return; // Skip rows without names

    const person = {
      name,
      title: getCellValue(row, headerMap.title),
      image: processImageUrl(photoValue, name),
      Photo: processImageUrl(photoValue, name), // Add both for compatibility
      research: parseResearch(getCellValue(row, headerMap.research)),
      email: getCellValue(row, headerMap.email),
      postAffiliation: getCellValue(row, headerMap.postAffiliation),
      education: {
        phd: buildEducation(row, headerMap.phdEducation, headerMap.phdInstitution, headerMap.phdYear),
        masters: buildEducation(row, headerMap.mtechEducation, headerMap.mtechInstitution, headerMap.mtechYear),
        bachelors: buildEducation(row, headerMap.btechEducation, headerMap.btechInstitution, -1) // No year column for BTech
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

