import { ObjectId } from 'mongodb';

const exportedMethods = {
    checkId(id, varName) {
        if (!id) throw `Error: You must provide a ${varName}`;
        if (typeof id !== 'string') throw `Error:${varName} must be a string`;
        id = id.trim();
        if (id.length === 0)
            throw `Error: ${varName} cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
        return id;
    },

    checkString(strVal, varName) {
        if (!strVal) throw `Error: You must supply a ${varName}!`;
        if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0)
            throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        if (!isNaN(strVal))
            throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
        return strVal;
    },

    checkStringArray(arr, varName) {
        //We will allow an empty array for this,
        //if it's not empty, we will make sure all tags are strings
        if (!arr || !Array.isArray(arr))
            throw `You must provide an array of ${varName}`;
        for (let i in arr) {
            if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
                throw `One or more elements in ${varName} array is not a string or is an empty string`;
            }
            arr[i] = arr[i].trim();
        }

        return arr;
    },
    checkNumber(number) {
        if (!number) throw "Input must be provided"
        if (number.trim().length === 0)
            throw 'Input cannot be just spaces';
        number = Number(number) // Convert string to Int
        if (!number) throw "Input Must Be a Number";
        if (!Number.isInteger(number)) throw " Input Must Be an Integer"
        if (typeof number !== "number") throw 'input must be a number';
        return number;
    },
    checkEmail(email) {
        // Check if input is null or undefined
        if (!email) throw 'Error: You must provide an email address';

        // Check type
        if (typeof email !== 'string') throw 'Error: Email must be a string';

        // Trim any whitespace
        email = email.trim();

        // Check if empty after trimming
        if (email.length === 0) throw 'Error: Email cannot be an empty string or just spaces';

        // Regular expression for validating email format
        // This validates basic email structure (local@domain.tld)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!emailRegex.test(email)) {
            throw 'Error: Invalid email format';
        }

        // Return lowercase email for consistency
        return email.toLowerCase();
    },
    checkDate(date) {
        // Check if input is null or undefined
        if (date === null || date === undefined) {
            throw new Error("Date cannot be null or undefined");
        }

        // Check type
        if (typeof date !== 'string') {
            throw new Error("Date must be a string");
        }
        date = date.trim();
        if (date === '') {
            throw new Error("Date cannot be empty");
        }
        const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
        const match = date.match(dateRegex);

        if (!match) {
            throw new Error("Date must be in format YYYY-MM-DD");
        }

        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10);
        const day = parseInt(match[3], 10);
        const current = new Date();
        if (year <= 1990 && yeat <= current.getFullYear()) {
            throw new Error("Year must be in correct range");
        }

        if (month < 1 || month > 12) {
            throw new Error("Month must be between 01 and 12");
        }
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            throw new Error(`Day must be between 01 and ${daysInMonth} for the given month`);
        }
        const formattedMonth = month.toString().padStart(2, '0');
        const formattedDay = day.toString().padStart(2, '0');

        return `${year}-${formattedMonth}-${formattedDay}`;
    },
    checkGender(gender) {

        if (gender === null || gender === undefined) {
            throw new Error("Gender cannot be null or undefined");
        }
        if (typeof gender !== 'string') {
            throw new Error("Gender must be a string");
        }
        gender = gender.trim();
        if (gender.length == 0) {
            throw new Error("Gender cannot be empty");
        }
        const validgender = ['male', 'female', 'other'];
        const resgender = gender.toLowerCase();

        if (!validgender.includes(resgender)) {
            throw new Error("Gender must be in: Male, Female, Other");
        }
        return resgender;
    },
    checkCity(city) {

    },
    checkState(state) {

    },
    checkEducation(education) {
        if (!education) return [];
        if (!Array.isArray(education)) throw 'Error: Education must be an array';
        const validatedEducation = education.filter(entry => {
            // Skip completely empty objects or non-objects
            if (!entry || typeof entry !== 'object' || Object.keys(entry).length === 0) {
                return false;
            }
            if (!entry.schoolName || entry.schoolName.trim().length === 0) {
                return false;
            }

            return true;
        }).map(entry => {

            const validatedEntry = {};

            validatedEntry.schoolName = this.checkString(entry.schoolName, 'School Name');

            // Validate education level if provided
            if (entry.educationLevel && entry.educationLevel.trim().length > 0) {
                validatedEntry.educationLevel = this.checkString(entry.educationLevel, 'Education Level');
            } else {
                validatedEntry.educationLevel = '';
            }

            // Validate major if provided
            if (entry.major && entry.major.trim().length > 0) {
                validatedEntry.major = this.checkString(entry.major, 'Major');
            } else {
                validatedEntry.major = '';
            }

            // Validate start date if provided
            if (entry.startDate && entry.startDate.trim().length > 0) {
                validatedEntry.startDate = this.checkDate(entry.startDate);
            } else {
                validatedEntry.startDate = '';
            }

            // Validate end date if provided
            if (entry.endDate && entry.endDate.trim().length > 0) {
                validatedEntry.endDate = this.checkDate(entry.endDate);
            } else {
                validatedEntry.endDate = '';
            }
            return validatedEntry;
        });

        return validatedEducation;
    },
    checkPassword(password, varName) {
        if (!password) throw `Error: You must supply a ${varName}!`;
        if (typeof password !== 'string') throw `Error: ${varName} must be a string!`;
        password = password.trim();
        if (password.length === 0)
            throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        return password;
    },
    getAge(dob) {
        dob = this.checkDate(dob);
        dob = new Date(dob);
        if (isNaN(dob.getTime())) {
            throw "Invalid date"
        }
        const now = new Date();

        let age = now.getFullYear() - dob.getFullYear();

        const monthdif = now.getMonth() - dob.getMonth();
        if (monthdif < 0 || (monthdif === 0 && now.getDate() < dob.getDate())) {
            age = age - 1;
        }

        return age;
    },

    getDate() {
        //Returns the current date in the following format: 2025-04-01T10:15:30Z
    
        let date = new Date();
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        let hours = String(date.getUTCHours()).padStart(2, '0');
        let minutes = String(date.getUTCMinutes()).padStart(2, '0');
        let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
        let currentDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    
        return currentDate;
    },
    
    
    
    isAdmin(
        groupId,
        userId
    ) {
        //Determines if given user is the admin of a group
        let group = groups.getGroupById(groupId);



        if(!group) throw 'Could not find group'

        let groupMembers = group.members;


        if(!groupMembers || groupMembers == []) throw 'Group has no members';

    
        if((group.members[0] == userId) && checkAuth(userId, authTk)) {
            return true;
        } else {
            return false;
        }
    
    },

    checkLocation(location){
        location = this.checkString(location, 'location');

        if(location != ('Edwin A. Stevens' || 'Library' || 'Gateway South' || 'Gateway North' || 'North Building' || 'Babbio' || 'ABS' || 'Burchard' || 'Carnegie' || 'Davidson' || 'Altorfer' || 'Kidde' || 'McLean' || 'Morton' || 'Nicoll' || 'Pierce' || 'Rocco' || 'TBD')){
            throw 'Invalid Location'
        }




        return location;

    },


    checkCourse(course){
        course = this.checkString(course, 'course')

        if(/^[a-zA-Z]{2,4}[-\s]\d{3}$/.test(course)){
            return course;
        } else {
            throw 'Course must be in following format: CS-546 or CS 546'
        }
    
    
    },


    checkTime(time){
        time = this.checkString(time, 'time');

        if(/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time)){
            return time;
        } else {
            throw 'Invalid Time'
        }

    },

    checkTimes(time1, time2){
        time1 = this.checkString(time1, 'startTime');
        time2 = this.checkString(time2, 'endTime');

        const convertToHHMM = (time) => {
            const [hours, minutes] = time.split(':');
            return parseInt(hours) * 100 + parseInt(minutes);
        };

    
        const timeNum1 = convertToHHMM(time1);
        const timeNum2 = convertToHHMM(time2);

    
        if (timeNum2 <= timeNum1) {
            throw 'End time must be later than start time';
        }
    
        return true;
    },


    checkType(groupType){
        groupType = this.checkString(groupType, 'groupType');

        if(groupType != "study-group"){
            throw 'Invalid group type'
        } else {
            return groupType;
        }

    }

};

export default exportedMethods;