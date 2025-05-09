import { groups } from '../config/mongoCollections.js';
import helpers from "../helpers.js";
import { ObjectId } from 'mongodb';


export const createGroup = async (
    groupName,
    description,
    capacity,
    location,
    course,
    startTime,
    endTime,
    meetingDate,
    groupType,
    creatorId,
    tags
) => {
    //Creates a new group
    if (!groupName || !description || !capacity || !location || !course || !startTime || !endTime || !meetingDate || !groupType || !creatorId || !tags) {
        throw 'All fields must have inputs'
    };

    let groupName = helpers.checkString(groupName, 'groupName');
    let description = helpers.checkString(description, 'description');
    if((!Number.isInteger(capacity)) || !((capacity > 1) && (capacity < 16))) throw 'Capacity must be a postiive integer less than 16 and greater than 1';
    let location = helpers.checkLocation(location);
    let course = helpers.checkCourse(course);
    let startTime = helpers.checkTime(time);
    let endTime = helpers.checkTime(time);
    checkTimes(startTime, endTime);
    let meetingDate = helpers.checkDate(meetingDate);
    let groupType = helpers.checkType(groupType);
    let creatorId = helpers.checkId(creatorId, 'creatorId');
    let tags = helpers.checkStringArray(tags, 'tags');






    let groupsCollection = await groups();
    if(!groupsCollection) throw 'Could not connect to database';


    const currentDate = helpers.getDate();
    if(!currentDate) throw 'Could not fetch current date';



    let group = {
        groupName,
        course,
        groupType,
        meetingDate,
        startTime,
        endTime,
        location,
        isFull: false,
        description,
        capacity,
        members: [creatorId],
        pendingMembers: [],
        tags,
        createdAt: currentDate,
        updatedAt: currentDate
    }
    if(!group) throw 'Could not create group';

    let newCollection = await groupsCollection.insertOne(group);
    if(!newCollection) throw 'Could not create group';




    return newCollection;

};



export const deleteGroup = async (
    groupId,
    userId
) => {
    console.log(groupId)


    if(!helpers.isAdmin(groupId, userId)){
        throw 'User does not have permissions to delete group';
    }


    const groupsCollection = await groups();
    
    const deletionInfo = await groupsCollection.findOneAndDelete({
      _id: new ObjectId(groupId)
    });
    
    if (!deletionInfo) throw `Could not delete post with id of ${groupId}`;
    return {...deletionInfo, deleted: true};

};



export const editGroup = async (
    groupId,
    groupName,
    description,
    capacity,
    location,
    course,
    startTime,
    endTime,
    meetingDate,
    groupType,
    creatorId,
    tags
) => {
    //Allows the user to edit most properties of a group
    if (!groupName || !description || !capacity || !location || !course || !startTime || !endTime || !meetingDate || !groupType || !creatorId || !tags) {
        throw 'All fields must have inputs'
    };

    let groupName = helpers.checkString(groupName, 'groupName');
    let description = helpers.checkString(description, 'description');
    if((!Number.isInteger(capacity)) || !((capacity > 1) && (capacity < 16))) throw 'Capacity must be a postiive integer less than 16 and greater than 1';
    let location = helpers.checkLocation(location);
    let course = helpers.checkCourse(course);
    let startTime = helpers.checkTime(time);
    let endTime = helpers.checkTime(time);
    checkTimes(startTime, endTime);
    let meetingDate = helpers.checkDate(meetingDate);
    let groupType = helpers.checkType(groupType);
    let creatorId = helpers.checkId(creatorId, 'creatorId');
    let tags = helpers.checkStringArray(tags, 'tags');



    if(!helpers.isAdmin(groupId, userId)) throw 'User does not have permissions to edit group';

    let groupsCollection = await groups();


    const currentDate = helpers.getDate();

    const currentGroupInfo = await groupsCollection.findOne({
        _id: new ObjectId(groupId)
    });

    let group = {
        groupName,
        course,
        groupType,
        meetingDate,
        startTime,
        endTime,
        location,
        isFull: false,
        description,
        capacity,
        members: [creatorId],
        pendingMembers: [],
        tags,
        createdAt: currentDate,
        updatedAt: currentDate
    }
};



export const getAllGroups = async () => {
    //Returns all groups
    let groupsCollection = await groups();
    let groupsCollection2 = await groupsCollection.find({}).toArray();
  
  
    if(groupsCollection2.length == 0) return [];
  
  
    return groupsCollection2;
  
};


export const getGroupById = async(groupId) => {
    //Returns group matching given Id
    if(!groupId) throw 'Must provide groupId';

    let groupId = helpers.checkId(groupId);



    const groupsCollection = await groups();
  
    const group = await groupsCollection.findOne({_id: new ObjectId(groupId)});
  
    if(!group) throw `Group that corresponds to the given id not found`;
  
    group._id = group._id.toString();
  
    
    return group;


};


export const getGroupsForMember = async(userId) => {
    //Returns all groups a specific user is a member of
    if(!userId) throw 'Must provide userId';

    let userId = helpers.checkId(userId);


    const groupsCollection = await groups();

    let groups = groupsCollection.find({ members: { $in: [userId] } })

    if(!groups) {
        throw 'Could not find any groups that the given user is part of';
    }
    

    return groups;



};


export const getAllNonFullGroups = async() => {
    //Returns all groups that are not full
    const groupsCollection = await groups();

    let groups = groupsCollection.find({ isFull: false })

    if(!groups) {
        throw 'Could not find any empty groups';
    }
    

    return groups;


};

export const requestToJoin = async(userId, groupId) =>{
    if(!userId) throw 'Must provide userId';
    if(!groupId) throw 'Must provide groupId';

    let userId = helpers.checkId(userId);
    let groupId = helpers.checkId(groupId);

    let groupsCollection = await groups();
    if(!groupsCollection) throw 'Could not connect to database';




    




};

export const rejectUser = async(userId, rejectedUser, groupId) => {
    if(!userId) throw 'Must provide userId';
    if(!rejectedUser) throw 'Must provide rejectedUser';
    if(!groupId) throw 'Must provide groupId';

    let userId = helpers.checkId(userId);
    let rejectedUser = helpers.checkId(rejectedUser);
    let groupId = helpers.checkId(groupId);





};


export const approveUser = async(userId, approvedUser, groupId) => {
    if(!userId) throw 'Must provide userId';
    if(!approvedUser) throw 'Must provide approvedUser';
    if(!groupId) throw 'Must provide groupId';

    let userId = helpers.checkId(userId);
    let approvedUser = helpers.checkId(approvedUser);
    let groupId = helpers.checkId(groupId);




    const groupsCollection = await groups();

    if(!helpers.isAdmin(userId)) throw 'Provided user id does not have admin permissions for the given group';


    const updatedGroup = await groupsCollection.updateOne(
        { _id: groupId },
        {
          $pull: { pendingMembers: approvedUser },
          $addToSet: { members: approvedUser }
        },
        { arrayFilters: [{ $elemMatch: { $eq: approvedUser } }] }
    );

    if(!updatedGroup) throw 'Could not update membership data';
    
    return updatedGroup;

};





export const getGroupsByProperty = async() => {

};