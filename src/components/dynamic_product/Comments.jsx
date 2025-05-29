import { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, Reply, Flag, User } from 'lucide-react';
import { createComment, fetchComments } from '../routes/CommentRoutes';

const Comments = ({ product }) => {
  const [comments, setComments] = useState([])

  const fetchProductComments = async () => {
    try{
      const response = await fetchComments(product?.id)
      setComments(response)
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProductComments()
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    message: '',
    product_id: product?.id,
    likes: 0,
    dislikes: 0
  })
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
    
 
  const handleSubmitComment = async () => {
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    
    try{
      const comment = await createComment(formData)
      console.log(comment)
      setComments([comment, ...comments]);
      setFormData({ name: '', message: '' });
    }catch(e){
      console.log(e)
    }

  };

  const handleSubmitReply = (commentId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      author: 'Anonymous User',
      comment: replyText,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));

    setReplyText('');
    setReplyTo(null);
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ));
    }
  };

  const handleDislike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === commentId ? { ...reply, dislikes: reply.dislikes + 1 } : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId ? { ...comment, dislikes: comment.dislikes + 1 } : comment
      ));
    }
  };


  return (
    <div className="mx-auto p-6 bg-white">
      {/* Header */}
      

      {/* Comments List */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <div className="space-y-6 max-h-[600px] overflow-scroll">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                  <span className="text-gray-500 text-sm">{comment.date}</span>
                </div>
                
                <p className="text-gray-700 mb-3">{comment.comment}</p>
                
                <div className="flex items-center space-x-4 text-sm">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                  
                  <button
                    onClick={() => handleDislike(comment.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-600"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{comment.dislikes}</span>
                  </button>
                  
                  <button
                    onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600">
                    <Flag className="w-4 h-4" />
                    <span>Report</span>
                  </button>
                </div>
                
                {/* Reply Form */}
                {replyTo === comment.id && (
                  <div className="mt-4 ml-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSubmitReply(comment.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 ml-8 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h5 className="font-medium text-gray-900 text-sm">{reply.author}</h5>
                            <span className="text-gray-500 text-xs">{reply.date}</span>
                          </div>
                          
                          <p className="text-gray-700 text-sm mb-2">{reply.comment}</p>
                          
                          <div className="flex items-center space-x-3 text-xs">
                            <button
                              onClick={() => handleLike(reply.id, true, comment.id)}
                              className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>{reply.likes}</span>
                            </button>
                            
                            <button
                              onClick={() => handleDislike(reply.id, true, comment.id)}
                              className="flex items-center space-x-1 text-gray-500 hover:text-red-600"
                            >
                              <ThumbsDown className="w-3 h-3" />
                              <span>{reply.dislikes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="mb-8 p-6 bg-gray-50 rounded-lg max-h-[400px]">
        <h3 className="text-lg font-semibold mb-4">Write a comment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          
         
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience with this product..."
          />
        </div>
    
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          onClick={() => handleSubmitComment()}
        >
          Submit Review
        </button>
        </div>
        </div>


    </div>
  );
};

export default Comments;