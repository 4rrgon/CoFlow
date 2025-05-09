import { Router } from 'express';
const router = Router();
import * as groupData from '../data/groups.js';
import middleware from '../middleware.js';
import Validation from '../helpers.js'



router.route('/').get(async (req, res) => {
    //code here for GET
    try {
        let groups = await groupData.getAllGroups();
        

        return res.render('groups', { groups });
    } catch (e) {
      return res.status(500).render('error', { error: 'Internal Server Error' });
    }
});

router.route('/reqJoin').post(async(req, res) => {
    try {
        return res.render('groups', { groups });
    } catch (e) {
      return res.status(500).render('error', { error: 'Internal Server Error' });
    }


});


router.route('/myGroups').get(async(req, res) => {
    try {

        let pendingGroups = await groupData.getPendingGroupsById();

        let myGroups = await groupData.getGroupById()

        return res.render('myGroups', {  })

        
    } catch (e) {

        
    }
});





export default router;