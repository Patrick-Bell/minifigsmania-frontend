import { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, Reply, Flag, User } from 'lucide-react';
import { createComment, fetchComments, replyToComment } from '../routes/CommentRoutes';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const Comments = ({ product }) => {
  const [comments, setComments] = useState([])
  const { user } = useAuth()
  console.log(user, 'user')

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
    name: user?.name || '',
    message: '',
    product_id: product?.id,
    likes: 0,
    dislikes: 0
  })
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState(user?.name || ''); // Added state for reply name
    
 
  const handleSubmitComment = async () => {
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    
    try{
      const comment = await createComment(formData)
      toast.success('Comment submitted successfully!');
      setComments([comment, ...comments]);
      setFormData({ name: '', message: '' });
    }catch(e){
      console.log(e)
    }

  };

  const handleSubmitReply = async (commentId) => {
    if (!replyText.trim() || !replyName.trim()) {
      alert('Please fill in both name and reply fields.');
      return;
    }
  
    try {
      const reply = {
        name: replyName,
        message: replyText,
        likes: 0,
        dislikes: 0,
        comment_id: commentId,
      };
  
      const response = await replyToComment(reply);
  
      toast.success('Reply submitted successfully!');
  
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), response],
              }
            : comment
        )
      );
  
      setReplyText('');
      setReplyName('');
      setReplyTo(null);
    } catch (e) {
      console.error('Error submitting reply:', e);
      toast.error('Failed to submit reply.');
    }
  };
  

  return (
    <div className="mx-auto p-6 bg-white">
      {/* Comments and Form Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Comments List */}
        <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                      <span className="text-gray-500 text-sm">{new Date(comment.created_at).toLocaleDateString()}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{comment.message}</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                     
                      
                      <button
                        onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 cursor-pointer"
                      >
                        <Reply className="w-4 h-4" />
                        <span>Reply</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 cursor-pointer">
                        <Flag className="w-4 h-4" />
                        <span>Report</span>
                      </button>
                    </div>
                    
                    {/* Reply Form */}
                    {replyTo === comment.id && (
                      <div className="mt-4 ml-4 space-y-3">
                        <input
                          type="text"
                          value={replyName}
                          onChange={(e) => setReplyName(e.target.value)}
                          placeholder="Your name..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            onClick={() => handleSubmitReply(comment.id)}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 cursor-pointer"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    )}
  
                    {/* Replies */}
                    {comment?.replies?.length > 0 && (
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
                                <h5 className="font-medium text-gray-900 text-sm">{reply.name}</h5>
                                <span className="text-gray-500 text-xs">{new Date(reply.created_at).toLocaleDateString()}</span>
                              </div>
                              
                              <p className="text-gray-700 text-sm mb-2">{reply.message}</p>
                            
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
  
        {/* Comment Form */}
        <div className="p-6 bg-gray-50 rounded-lg max-h-[600px] overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Write a comment</h3>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Share your thoughts about the product"
            />
          </div>
  
          <button
            type="submit"
            onClick={() => handleSubmitComment()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
  

export default Comments