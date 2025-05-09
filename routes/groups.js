import { Router } from 'express';
const router = Router();
import * as groupData from '../data/groups.js';
import middleware from '../middleware.js';
import Validation from '../helpers.js'



router.route('/').get(async (req, res) => {
    //code here for GET
    try {
      const user = req.session.user || null;
  
      return res.render('groups', {
        
      });
    } catch (e) {
      return res.status(500).render('error', { error: 'Internal Server Error' });
    }
  });