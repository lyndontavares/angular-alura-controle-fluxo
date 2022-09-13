const { commentAPI } = require('../api'),
    path = require('path'),
    { wrapAsync, auth } = require('../infra')

module.exports = app => {

    app.route('/photos/:photoId/comments')
        .get(wrapAsync(commentAPI.listAllFromPhoto))
        .post(auth, wrapAsync(commentAPI.add));

    app.route('/comments/:id')
        .delete(auth, wrapAsync(commentAPI.deleteComment));
};
