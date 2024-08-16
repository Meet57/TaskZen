// src/app/components/SearchBar.js
import React, { useState, useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import debounce from "lodash/debounce";
import { Select, Input } from 'antd';

const { Option } = Select;

const SearchBar = () => {
  const { handleFilterTasks, tags } = useContext(TaskContext);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleTagsChange = (value) => {
    setSelectedTags(value);
  };

  const debouncedFilterTasks = debounce(() => {
    handleFilterTasks({ searchText, status, tags: selectedTags });
  }, 300); // Adjust debounce delay as needed

  useEffect(() => {
    debouncedFilterTasks();
    return () => debouncedFilterTasks.cancel(); // Cleanup on component unmount
  }, [searchText, status, selectedTags]);

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
      {/* Status Dropdown */}
      <Select
        value={status}
        onChange={handleStatusChange}
        className="w-full md:w-1/6"
        placeholder="Select Status"
      >
        <Option value="">All Statuses</Option>
        <Option value="To Do">To Do</Option>
        <Option value="In Progress">In Progress</Option>
        <Option value="Done">Done</Option>
      </Select>

      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search tasks"
        value={searchText}
        onChange={handleSearchTextChange}
        className="w-full md:w-3/6"
      />

      {/* Tags Dropdown */}
      <Select
        mode="multiple"
        value={selectedTags}
        onChange={handleTagsChange}
        className="w-full md:w-2/6"
        placeholder="Select Tags"
      >
        {tags.map(tag => (
          <Option key={tag} value={tag}>
            {tag}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SearchBar;
