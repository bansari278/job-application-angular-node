const express = require('express');
const router = express.Router();
const applicationController = require('../../modules/application/application.controller');

router.post('/application', applicationController.add_application);
router.get('/applications', applicationController.get_applications);
router.get('/application/:id', applicationController.get_application_by_id);
router.put('/application/:id', applicationController.update_application);
router.delete('/application/:id', applicationController.delete_application);

module.exports = router;
