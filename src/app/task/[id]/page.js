"use client";
import React, { useEffect, useState, useContext } from 'react';
import { Card, Typography, Tag, Button, Input, List, Avatar, Popconfirm } from 'antd';
import { TaskContext } from '../../context/TaskContext';
import { useParams, useRouter } from 'next/navigation';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const TaskDetails = () => {
  const { fetchTaskById, fetchCommentsByTaskId, addComment, deleteComment, editComment } = useContext(TaskContext);
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchTaskById(id).then(setTask);
      // If you are using real API
      fetchCommentsByTaskId(id).then(setComments);
    }
  }, [id]);

  const handleAddComment = async () => {
    if (commentText.trim()) {
      await addComment(id, commentText);
      setCommentText('');
      fetchCommentsByTaskId(id).then(setComments);
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(id, commentId);
    fetchCommentsByTaskId(id).then(setComments);
  };

  const handleEditComment = async (commentId, newText) => {
    await editComment(id, commentId, newText);
    // Simulate editing a comment
    fetchCommentsByTaskId(id).then(setComments);
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
                  <Popconfirm
                    title="Are you sure you want to delete this comment?"
                    onConfirm={() => handleDeleteComment(comment.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link" danger>🗑️</Button>
                  </Popconfirm>
                  // <Button type="link" danger onClick={() => handleEditComment(comment.id)}>📝</Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar>{comment.name ? comment.name.split(' ').slice(0,2).map(name => name[0]).join(''): "N/A"}</Avatar>}
                  title={comment.name}
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
