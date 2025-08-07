// !=====================  ContactSubmissions  =====================


// Configuration constants
var SHEET_NAME = 'ContactSubmissions';
var LOCK_TIMEOUT = 10000; // 10 seconds

var scriptProperties = PropertiesService.getScriptProperties();

/**
 * Initial setup function to store the active spreadsheet ID
 * Run this once when setting up the script
 */
function initialSetup() {
  try {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    scriptProperties.setProperty('key', activeSpreadsheet.getId());
    console.log('Setup completed successfully. Spreadsheet ID stored.');
  } catch (error) {
    console.error('Error during initial setup:', error.toString());
    throw error;
  }
}

/**
 * Handles POST requests from contact form submissions
 * Automatically creates sheet if it doesn't exist
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  
  try {
    // Acquire lock to prevent concurrent executions
    if (!lock.tryLock(LOCK_TIMEOUT)) {
      throw new Error('Could not acquire lock within timeout period');
    }
    
    // Validate that we have the spreadsheet key
    var spreadsheetKey = scriptProperties.getProperty('key');
    if (!spreadsheetKey) {
      throw new Error('Spreadsheet key not found. Please run initialSetup() first.');
    }
    
    // Open the spreadsheet
    var doc = SpreadsheetApp.openById(spreadsheetKey);
    var sheet = doc.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist (automatic sheet creation)
    if (!sheet) {
      console.log('Sheet not found. Creating new sheet: ' + SHEET_NAME);
      sheet = doc.insertSheet(SHEET_NAME);
      
      // Add headers to the new sheet
      var headers = ['timestamp', 'name', 'email', 'subject', 'message'];
      sheet.appendRow(headers);
      
      // Optional: Format the header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f0f0f0');
      
      console.log('Sheet created successfully with headers');
    }
    
    // Get current headers and next available row
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    
    // Validate required parameters
    if (!e.parameter) {
      throw new Error('No parameters received');
    }
    
    // Map form data to spreadsheet columns
    var newRow = headers.map(function(header) {
      switch (header.toLowerCase()) {
        case 'timestamp':
          return new Date();
        case 'name':
          return e.parameter['name'] || '';
        case 'email':
          return e.parameter['email'] || '';
        case 'subject':
          return e.parameter['subject'] || '';
        case 'message':
          return e.parameter['message'] || '';
        default:
          return '';
      }
    });
    
    // Add the new row to the sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    console.log('Data successfully added to row ' + nextRow);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success', 
        row: nextRow,
        message: 'Contact form submission saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error', 
        error: error.toString(),
        message: 'Failed to save contact form submission'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } finally {
    // Always release the lock
    if (lock) {
      lock.releaseLock();
    }
  }
}






// !=====================  JobApplication  =====================


// Configuration constants
var SHEET_NAME = 'JobApplication';
var LOCK_TIMEOUT = 10000; // 10 seconds

var scriptProperties = PropertiesService.getScriptProperties();

/**
 * Initial setup function to store the active spreadsheet ID
 * Run this once when setting up the script
 */
function initialSetup() {
  try {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    scriptProperties.setProperty('key', activeSpreadsheet.getId());
    console.log('Setup completed successfully. Spreadsheet ID stored.');
  } catch (error) {
    console.error('Error during initial setup:', error.toString());
    throw error;
  }
}

/**
 * Handles POST requests from job application form submissions
 * Automatically creates sheet if it doesn't exist
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  
  try {
    // Acquire lock to prevent concurrent executions
    if (!lock.tryLock(LOCK_TIMEOUT)) {
      throw new Error('Could not acquire lock within timeout period');
    }
    
    // Validate that we have the spreadsheet key
    var spreadsheetKey = scriptProperties.getProperty('key');
    if (!spreadsheetKey) {
      throw new Error('Spreadsheet key not found. Please run initialSetup() first.');
    }
    
    // Open the spreadsheet
    var doc = SpreadsheetApp.openById(spreadsheetKey);
    var sheet = doc.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist (automatic sheet creation)
    if (!sheet) {
      console.log('Sheet not found. Creating new sheet: ' + SHEET_NAME);
      sheet = doc.insertSheet(SHEET_NAME);
      
      // Add comprehensive headers for job application form
      var headers = ['timestamp', 'jobTitle','firstName', 'lastName', 'jobDepartment', 'jobLocation', 'jobType',
                     'email', 'phone', 'location', 'linkedIn', 'github', 'portfolio',
                     'currentRole', 'currentCompany', 'yearsOfExperience', 'relevantExperience', 'previousCompany',
                     'degree', 'institution', 'graduationYear', 'additionalCertifications',
                     'technicalSkills', 'frameworks', 'databases', 'tools',
                     'whyInterested', 'availabilityDate', 'salaryExpectation', 'willingToRelocate',
                     'resume', 'coverLetterFile'];
      sheet.appendRow(headers);
      
      // Optional: Format the header row
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f0f0f0');
      
      // Auto-resize columns for better readability
      sheet.autoResizeColumns(1, headers.length);
      
      console.log('Job application sheet created successfully with ' + headers.length + ' headers');
    }
    
    // Get current headers and next available row
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    
    // Validate required parameters
    if (!e.parameter) {
      throw new Error('No parameters received');
    }
    
    // Create a parameter mapping object for cleaner code
    var parameterMapping = {
      'timestamp': new Date(),
      'jobTitle': e.parameter['jobTitle'] || '',
      'firstName': e.parameter['firstName'] || '',
      'lastName': e.parameter['lastName'] || '',
      'jobDepartment': e.parameter['jobDepartment'] || '',
      'jobLocation': e.parameter['jobLocation'] || '',
      'jobType': e.parameter['jobType'] || '',
      'email': e.parameter['email'] || '',
      'phone': e.parameter['phone'] || '',
      'location': e.parameter['location'] || '',
      'linkedIn': e.parameter['linkedIn'] || '',
      'github': e.parameter['github'] || '',
      'portfolio': e.parameter['portfolio'] || '',
      'currentRole': e.parameter['currentRole'] || '',
      'currentCompany': e.parameter['currentCompany'] || '',
      'yearsOfExperience': e.parameter['yearsOfExperience'] || '',
      'relevantExperience': e.parameter['relevantExperience'] || '',
      'previousCompany': e.parameter['previousCompany'] || '',
      'degree': e.parameter['degree'] || '',
      'institution': e.parameter['institution'] || '',
      'graduationYear': e.parameter['graduationYear'] || '',
      'additionalCertifications': e.parameter['additionalCertifications'] || '',
      'technicalSkills': e.parameter['technicalSkills'] || '',
      'frameworks': e.parameter['frameworks'] || '',
      'databases': e.parameter['databases'] || '',
      'tools': e.parameter['tools'] || '',
      'whyInterested': e.parameter['whyInterested'] || '',
      'availabilityDate': e.parameter['availabilityDate'] || '',
      'salaryExpectation': e.parameter['salaryExpectation'] || '',
      'willingToRelocate': e.parameter['willingToRelocate'] || '',
      'resume': e.parameter['resume'] || '',
      'coverLetterFile': e.parameter['coverLetterFile'] || ''
    };
    
    // Map form data to spreadsheet columns
    var newRow = headers.map(function(header) {
      return parameterMapping[header] || '';
    });
    
    // Add the new row to the sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
    
    console.log('Job application data successfully added to row ' + nextRow);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'success', 
        row: nextRow,
        message: 'Job application submitted successfully',
        applicantName: (e.parameter['firstName'] || '') + ' ' + (e.parameter['lastName'] || ''),
        jobTitle: e.parameter['jobTitle'] || 'Not specified'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing job application:', error.toString());
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: 'error', 
        error: error.toString(),
        message: 'Failed to save job application. Please try again.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } finally {
    // Always release the lock
    if (lock) {
      lock.releaseLock();
    }
  }
}





//! ============  setupJobSheet ===========================


// Main function to set up the job positions sheet (headers only, no data)
function setupJobSheet() {
  // Get the active spreadsheet
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    Logger.log('Error: No active spreadsheet found.');
    return;
  }

  // Define sheet name
  const sheetName = 'OpenPositions';
  let sheet = spreadsheet.getSheetByName(sheetName);

  // Create the sheet if it doesn't exist, or clear it if it does
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    Logger.log(`Created new sheet: ${sheetName}`);
  } else {
    sheet.clear(); // Clear existing content for fresh setup
    Logger.log(`Cleared existing sheet: ${sheetName}`);
  }

  // Define headers (must match your React code's expected fields)
  const headers = [
    'id', 'title', 'category', 'level', 'location', 'type', 'salary', 'experience',
    'description', 'requirements', 'benefits', 'gradient', 'urgency', 'postedDays',
    'applicants', 'tags', 'team', 'department'
  ];

  // Set headers in row 1
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Auto-resize columns for better readability
  sheet.autoResizeColumns(1, headers.length);

  // Optional: Freeze the header row
  sheet.setFrozenRows(1);

  Logger.log('Sheet setup completed successfully with headers only. Add your job data manually.');
}

// Helper function to run onOpen (creates a menu item for easy access)
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Job Sheet Setup')
    .addItem('Run Initial Setup', 'setupJobSheet')
    .addToUi();
}









