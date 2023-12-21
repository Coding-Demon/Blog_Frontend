import axios from 'axios';
import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';


const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, []);

    console.log(blogs);

    return (
        <div>
            {blogs && blogs.map(blog => (
                <BlogCard
                    id={blog._id}
                    isUser={true}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.user.username}
                    time={blog.createdAt}
                />
            ))}

        </div>
    )
}

export default UserBlogs