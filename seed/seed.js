import * as groups from "../data/groups.js";


console.log('Testing Create Group function');
try {
    let output = await groups.createGroup(
        "CS546 Group11",
        "We are looking for a group for out 546 project",
        5,
        "Library",
        "CS 546",
        "21:00",
        "22:00",
        "2024-01-01",
        "study-group",
        "12345",
        ['javascript', 'computer science', 'web programming']
    
    );

    console.log(output);
    
} catch (error) {
    console.log(error);
    
}


let output2 = await groups.createGroup(
    "MA331 Group",
    "I am looking for people to study with in MA331",
    5,
    "gateway south",
    "MA331",
    "20:00",
    "21:00",
    "2024-03-02",
    "study-group",
    "12345",
    "statistics"

);


let output3 = await groups.createGroup(
    "CS146 Group",
    "I am looking for people to join my CS146 Final Project Group",
    3,
    "gateway south",
    "CS146",
    "18:00",
    "20:00",
    "2024-03-04",
    "study-group",
    "12345",
    "statistics"

);



console.log(output);

let addedGroupId = output.insertedId;

console.log(addedGroupId);

console.log(output2);

let addedGroupId2 = output2.insertedId;

console.log(addedGroupId2);


console.log(output3);

let addedGroupId3 = output3.insertedId;

console.log(addedGroupId3);



console.log('Testing Find All Groups Funtion');
let allGroups = await groups.getAllGroups();

console.log(allGroups);

console.log('Testing Find Group by Id');
let groupById = await groups.getGroupById(addedGroupId);

console.log(groupById);

console.log('Testing Delete Group Funtion');
let deletedGroup = await groups.deleteGroup(addedGroupId, '12345', 'tempAuthKey');

console.log(deletedGroup);


console.log('Testing Find Group by Id');
try {
    let groupById2 = await groups.getGroupById(addedGroupId);
    console.log(groupById2);
    
} catch (e) {
    console.log('Could not find group, group deleted sucessfully')
    
}

