#!/usr/bin/env node

/**
 * Automated script to fix axios imports and calls across frontend components
 * This script replaces plain `axios` with `axiosInstance` and removes manual Authorization headers
 * 
 * Run: node fix-axios-imports.js
 */

const fs = require('fs');
const path = require('path');

const files = [
  'frontend/demo/appointment-demo/EditDemoClassForm.tsx',
  'frontend/demo/appointment-demo/DemoClassForm.tsx',
  'frontend/demo/appointment-demo/EditStudentDetailsForm.tsx',
  'frontend/demo/appointment-demo/NormalClassForm.jsx',
  'frontend/demo/appointment-demo/PtmForm.tsx',
  'frontend/demo/assessment-demo/UploadAssessmentButton.tsx',
  'frontend/demo/attendance-demo/EditAttendanceForm.jsx',
  'frontend/demo/batch-entry-demo/EditBatchEntryForm.jsx',
  'frontend/demo/feedback-demo/FeedbackAdminForm.tsx',
  'frontend/demo/students-demo/course-catalog/CourseCatalog.tsx',
  'frontend/demo/students-demo/dashboard/StudentDashboard.tsx',
  'frontend/demo/students-demo/dashboard/WelcomeBanner.tsx',
  'frontend/demo/table-demo/AssessmentTable.tsx',
  'frontend/demo/table-demo/PtmTable.tsx',
  'frontend/demo/table-demo/StudentsTable.tsx',
  'frontend/demo/table-demo/TableAttendance.tsx',
  'frontend/demo/table-demo/TableBatchEntries.tsx',
  'frontend/demo/table-demo/TableCourseEntries.tsx',
  'frontend/demo/table-demo/TableDemoClass.tsx',
  'frontend/demo/table-demo/TableNormalClass.tsx',
  'frontend/demo/time-off-demo/CardViewDemo.tsx',
  'frontend/demo/time-off-demo/EditHolidayForm.tsx',
  'frontend/demo/time-off-demo/LeaveForm.tsx',
  'frontend/demo/time-off-demo/StatusUpdateForm.tsx',
  'frontend/demo/time-off-demo/TableViewDemo.tsx',
];

function fixFile(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    let content = fs.readFileSync(fullPath, 'utf-8');
    let modified = false;

    // Fix 1: Replace import statements
    const importRegex = /import\s+axios,\s*{\s*AxiosError\s*}\s+from\s+["']axios["']/g;
    if (importRegex.test(content)) {
      content = content.replace(importRegex, `import { AxiosError } from "axios";\nimport axiosInstance from '@/lib/axiosConfig'`);
      modified = true;
      console.log(`  ✓ Fixed imports in ${path.basename(filePath)}`);
    }

    // Fix 2: Replace axios.get/post/put/delete calls
    // Pattern 1: axios.get/post/put/delete with Authorization header
    const axiosCallRegex = /axios\.(get|post|put|delete)\(/g;
    if (axiosCallRegex.test(content)) {
      content = content.replace(axiosCallRegex, 'axiosInstance.$1(');
      modified = true;
      console.log(`  ✓ Replaced axios calls with axiosInstance in ${path.basename(filePath)}`);
    }

    // Fix 3: Remove manual Authorization headers
    // Pattern: { withCredentials: true, headers: { Authorization: Cookies.get("token") } }
    const pattern1 = /,\s*{\s*headers:\s*{\s*Authorization:\s*Cookies\.get\(["']token["']\)\s*}\s*}/g;
    if (pattern1.test(content)) {
      content = content.replace(pattern1, '');
      modified = true;
    }

    // Pattern: { headers: { Authorization: Cookies.get("token") } }
    const pattern2 = /,\s*{\s*headers:\s*{\s*Authorization:\s*Cookies\.get\(["']token["']\)\s*}\s*}\s*\)/g;
    if (pattern2.test(content)) {
      content = content.replace(pattern2, ')');
      modified = true;
    }

    // Pattern: withCredentials: true, headers:{ Authorization:Cookies.get("token") }
    const pattern3 = /\{\s*withCredentials:\s*true,\s*headers:\s*{\s*Authorization:\s*Cookies\.get\(["']token["']\)\s*}\s*}/g;
    if (pattern3.test(content)) {
      content = content.replace(pattern3, '{ withCredentials: true }');
      modified = true;
    }

    // Pattern: headers:{ Authorization:Cookies.get("token") }, withCredentials: true
    const pattern4 = /\{\s*headers:\s*{\s*Authorization:\s*Cookies\.get\(["']token["']\)\s*},\s*withCredentials:\s*true\s*}/g;
    if (pattern4.test(content)) {
      content = content.replace(pattern4, '{ withCredentials: true }');
      modified = true;
    }

    // Pattern: headers: { Authorization: Cookies.get("token") }  with no withCredentials
    const pattern5 = /,\s*\{\s*headers:\s*{\s*Authorization:\s*Cookies\.get\(["']token["']\)\s*}\s*}/g;
    if (pattern5.test(content)) {
      content = content.replace(pattern5, '');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      console.log(`  ✓ Fixed ${filePath}`);
    } else {
      console.log(`  - No changes needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}: ${error.message}`);
  }
}

console.log('🔧 Starting axios import fixes...\n');

files.forEach(file => {
  fixFile(file);
});

console.log('\n✅ Axios import fixes complete!');
console.log('\n📝 Next steps:');
console.log('1. Review the changes in git diff');
console.log('2. Test the batch creation feature in production');
console.log('3. Verify userProfile endpoint calls work correctly');
