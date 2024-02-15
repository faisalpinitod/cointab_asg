import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { useParams } from 'react-router-dom';

const Post = ({ match }) => {
  const [posts, setPosts] = useState([]);
  const [showBulkAdd, setShowBulkAdd] = useState(true);
  const [showDownloadExcel, setShowDownloadExcel] = useState(false);
  const {userId} = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response =await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => response.json())
        .then((json) =>  setPosts(json));

        if (response.data.length > 0) {
          setShowBulkAdd(false);
          setShowDownloadExcel(true);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]);

  const addPostsToDatabase = async () => {
    try {
  
      console.log('Adding posts to database:', posts);
      
      setShowDownloadExcel(true);
      
      setShowBulkAdd(false);
    } catch (error) {
      console.error('Error adding posts to database:', error);
    }
  };

  const downloadExcelFile = async () => {
    try {
      
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Posts');
      
      worksheet.columns = [
        { header: 'Title', key: 'title', width: 30 },
        { header: 'Body', key: 'body', width: 50 },
      ];
    
      posts.forEach(post => {
        worksheet.addRow({ title: post.title, body: post.body });
      });
    
      const buffer = await workbook.xlsx.writeBuffer();
     
      saveAs(new Blob([buffer]), `posts_${userId}.xlsx`);
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  return (
    <div>
      <h1>Posts for User {userId}</h1>
      <div>
       
        {showBulkAdd && <button onClick={addPostsToDatabase}>Bulk Add</button>}
    
        {showDownloadExcel && <button onClick={downloadExcelFile}>Download In Excel</button>}
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
