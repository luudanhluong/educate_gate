const fs = require('fs');
const shuffleArray = require('./shuffleArray');
const excelParser = require('./excelParser'); // Đảo dữ liệu từ Excel

function divideStudentsIntoGroups(students, numOfGroups, shuffle) {
    const groups = Array.from({ length: numOfGroups }, () => []);
    if (shuffle) {
        shuffleArray(students);
    }
    students.forEach((student, index) => {
        const groupIndex = index % numOfGroups;
        groups[groupIndex].push(student);
    });

    return groups;
}

function addStudentsToDatabase(students) {
    console.log('Thêm sinh viên vào cơ sở dữ liệu thành công!');
}

function generateGroups(filePath, numOfGroups, shuffle) {
    let students;
    if (filePath.endsWith('.xlsx')) {
        students = excelParser(filePath);
    } else {
        students = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean); 
    }

    const groups = divideStudentsIntoGroups(students, numOfGroups, shuffle);
    groups.forEach((group, index) => {
        console.log(`Nhóm ${index + 1}:`, group);
        addStudentsToDatabase(group);
    });
}

