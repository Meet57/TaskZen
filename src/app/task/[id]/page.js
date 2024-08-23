"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Tag,
  Button,
  Input,
  List,
  Avatar,
  Popconfirm,
  Modal,
} from "antd";
import { TaskContext } from "../../context/TaskContext";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import CreateTaskForm from "../../components/CreateTaskForm"; // Update the path if needed

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const TaskDetails = () => {
  const {
    fetchTaskById,
    fetchCommentsByTaskId,
    addComment,
    deleteComment,
    handleDeleteTask,
    handleUpdateTask,
  } = useContext(TaskContext);
  const { getSessionDetails } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchTaskById(id).then(setTask);
      fetchCommentsByTaskId(id).then(setComments);
    }
  }, [id]);

  const handleAddComment = async () => {
    if (commentText.trim()) {
      await addComment(id, commentText);
      setCommentText("");
      fetchCommentsByTaskId(id).then(setComments);
    }
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(id, commentId);
    fetchCommentsByTaskId(id).then(setComments);
  };

  const deleteTask = async () => {
    await handleDeleteTask(id);
    router.push("/"); // Redirect to the home page
  };

  const handleEditTask = async (values) => {
    await handleUpdateTask(id, values);
    setIsModalVisible(false);
    fetchTaskById(id).then(setTask); // Refresh task details
  };

  const canDeleteTask = task && getSessionDetails().username === task.createdBy;

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      {/* Task Details Section */}
      {task && (
        <Card className="shadow-lg p-6 flex-1">
          <Row gutter={16} align="middle">
            <Col span={12}>
              <Title level={2}>{task.title}</Title>
            </Col>
            <Col span={12} className="text-right">
              {canDeleteTask && (
                <>
                  <Button
                    onClick={() => setIsModalVisible(true)}
                    style={{ borderColor: "#52c41a", color: "#52c41a" }}
                    className="mr-2"
                  >
                    Edit Task
                  </Button>
                  <Popconfirm
                    title="Are you sure you want to delete this task?"
                    onConfirm={deleteTask}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Delete Task</Button>
                  </Popconfirm>
                </>
              )}
            </Col>
          </Row>
          <div className="space-y-4">
            <Row gutter={16}>
              <Col span={12}>
                <Paragraph>
                  <Text strong>Priority:</Text> {task.priority}
                </Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph>
                  <Text strong>Tags:</Text>{" "}
                  {task.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph>
                  <Text strong>Assigned To:</Text>{" "}
                  {task.assignedTo.map((user) => (
                    <Tag key={user}>{user}</Tag>
                  ))}
                </Paragraph>
              </Col>
              <Col span={12}>
                <Paragraph>
                  <Text strong>Created By:</Text>{" "}
                  <Tag key={task.createdBy}>{task.createdBy}</Tag>
                </Paragraph>
              </Col>
            </Row>
            <Paragraph>
              <Text strong>Description:</Text>
            </Paragraph>
            <Card>{task.description}</Card>
          </div>
        </Card>
      )}

      {/* Comment Section */}
      <Card className="shadow-lg p-6 flex-1 lg:max-w-sm">
        <Title level={4} className="text-center">
          Comments
        </Title>
        <div className="h-96 overflow-y-auto pr-2">
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment) => (
              <List.Item
                actions={[
                  comment.username === getSessionDetails().username ? (
                    <Popconfirm
                      title="Are you sure you want to delete this comment?"
                      onConfirm={() => handleDeleteComment(comment.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link" danger>
                        🗑️
                      </Button>
                    </Popconfirm>
                  ) : null,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar>
                      {comment.name
                        ? comment.name
                            .split(" ")
                            .slice(0, 2)
                            .map((name) => name[0])
                            .join("")
                        : "N/A"}
                    </Avatar>
                  }
                  title={
                    comment.name +
                    (comment.username === getSessionDetails().username
                      ? " (You)"
                      : "")
                  }
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
          <Button
            type="primary"
            onClick={handleAddComment}
            className="mt-2 w-full"
          >
            Add Comment
          </Button>
        </div>
      </Card>

      {/* Edit Task Modal */}
      <Modal
        title="Edit Task"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <CreateTaskForm
          initialValues={task} // Pass the current task details as initial values
          onClose={() => setIsModalVisible(false)}
          onSubmit={handleEditTask} // Pass the handler for form submission
        />
      </Modal>
    </div>
  );
};

export default TaskDetails;
