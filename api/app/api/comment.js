const { CommentDao, PhotoDao } = require('../infra');

const userCanComment = userId => photo =>
    photo.allowComments || photo.userId === userId;

const api = {};

api.add = async (req, res) => {

    const { photoId } = req.params;
    const { commentText } = req.body;

    const commentDao = new CommentDao(req.db);
    const photoDao = new PhotoDao(req.db);

    const photo = await photoDao.findById(photoId);
    const canComment = userCanComment(req.user.id)(photo);

    if(canComment) {
        const commentId = await commentDao.add(commentText, photo.id, req.user.id);
        const comment = await commentDao.findById(commentId);
        console.log(`Comment added`, comment);
        res.json(comment);
    } else {
        res.status(403).json({ message: 'Forbiden'});
    }
};

api.listAllFromPhoto = async (req, res) => {

    const { photoId } = req.params;
    console.log(`Get comments from photo ${photoId}`);
    const comments = await new CommentDao(req.db).listAllFromPhoto(photoId);
    console.log(comments);
    res.json(comments);
}

api.deleteComment = async (req, res) => {

  const commentId = req.params['id'];

  console.log(`deletar comentário: ${commentId}`)

   try {
       const comment = new CommentDao(req.db).deleteById(commentId) ;
       console.log(`Comment  deleted!`, comment);
       res.json(`Comment deleted: ${comment}`);
    } catch(e) {
        res.status(403).json({ message: 'Forbiden'});
    }
};


module.exports = api;
