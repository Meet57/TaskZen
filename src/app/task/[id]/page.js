"use client";
import React, { useEffect, useState, useContext } from 'react';
import { Card, Typography, Tag, Button, Input, List, Avatar } from 'antd';
import { TaskContext } from '../../context/TaskContext';
import { useParams } from 'next/navigation';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const TaskDetails = () => {
  const { fetchTaskById, fetchCommentsByTaskId, addComment, deleteComment, editComment } = useContext(TaskContext);
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const { id } = useParams();

  // Dummy comments data for testing
  const dummyComments = [
    {
      id: '1',
      taskId: 'task1',
      owner: 'Alice Johnson',
      content: 'This task is progressing well. We should complete it by the end of the week.'
    },
    {
      id: '2',
      taskId: 'task1',
      owner: 'Bob Smith',
      content: 'I’ve encountered a minor issue. Will update you once I resolve it.'
    },
    {
      id: '3',
      taskId: 'task1',
      owner: 'Charlie Davis',
      content: 'Looking forward to the demo on Friday. Everything seems to be on track.'
    }
  ];

  useEffect(() => {
    if (id) {
      fetchTaskById(id).then(setTask);
      // Simulate fetching comments data
      setComments(dummyComments);
      // If you are using real API
      // fetchCommentsByTaskId(id).then(setComments);
    }
  }, [id]);

  const handleAddComment = async () => {
    if (commentText.trim()) {
      await addComment(id, commentText);
      setCommentText('');
      // Simulate adding a new comment
      const newComment = {
        id: (comments.length + 1).toString(),
        taskId: id,
        owner: 'New User', // Replace with dynamic user info
        content: commentText
      };
      setComments([...comments, newComment]);
      // If using real API
      // fetchCommentsByTaskId(id).then(setComments);
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(id, commentId);
    // Simulate deleting a comment
    setComments(comments.filter(comment => comment.id !== commentId));
    // If using real API
    // fetchCommentsByTaskId(id).then(setComments);
  };

  const handleEditComment = async (commentId, newText) => {
    await editComment(id, commentId, newText);
    // Simulate editing a comment
    setComments(comments.map(comment => comment.id === commentId ? { ...comment, content: newText } : comment));
    // If using real API
    // fetchCommentsByTaskId(id).then(setComments);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      {/* Task Details Section */}
      {task && (
        <Card className="shadow-lg p-6 flex-1">
          <Title level={2} className="text-center">{task.title}</Title>
          <div className="space-y-4">
            <Paragraph><Text strong>Priority:</Text> {task.priority}</Paragraph>
            <Paragraph><Text strong>Tags:</Text> {task.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Paragraph>
            <Paragraph><Text strong>Assigned To:</Text> {task.assignedTo.map(user => <Tag key={user}>{user}</Tag>)}</Paragraph>
            <Paragraph><Text strong>Created By:</Text> <Tag key={task.createdBy}>{task.createdBy}</Tag></Paragraph>
            <Paragraph><Text strong>Description:</Text></Paragraph>
            <Card>
              {task.description}
            </Card>
          </div>
        </Card>
      )}

      {/* Comment Section */}
      <Card className="shadow-lg p-6 flex-1 lg:max-w-sm">
        <Title level={4} className="text-center">Comments</Title>
        <div className="h-96 overflow-y-auto pr-2">
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment) => (
              <List.Item
                actions={[
                  <Button type="link" danger onClick={() => handleDeleteComment(comment.id)}>🗑️</Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar>{comment.owner.charAt(0) + comment.owner.charAt(comment.owner.length - 1)}</Avatar>}
                  title={comment.owner}
                  description={comment.content}
                />
              </List.Item>
            )}
          />
        </div>
        <div className="mt-4">
          <TextArea
            rows={1}
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button type="primary" onClick={handleAddComment} className="mt-2 w-full">Add Comment</Button>
        </div>
      </Card>
    </div>
  );
};

export default TaskDetails;
