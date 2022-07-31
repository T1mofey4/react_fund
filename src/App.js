import React, {useMemo, useRef, useState} from "react";
import Counter from "./components/counter";
import ClassCounter from "./components/classComponent";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect"
import PostFilter from "./components/PostFilter";


function App() {
  const [posts, setPosts] = useState([
    {id: '1.', title: 'Пост номер 1', body: 'Вввв'},
    {id: '2.', title: 'Пост номер 2', body: 'Аааа'},
    {id: '3.', title: 'Пост номер 3', body: 'Дддд'}
  ]);

  const [filter, setFilter] = useState({sort: '', query: ''})
  // const [searchQuery, setSearchQuery] = useState('');
  // const [selectedSort, setSelectedSort] = useState('');

  const sortedPosts = useMemo(() => {
    console.log('Sorted Posts work')

    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    } else {
      return posts;
    }
  }, [filter.sort, posts]);

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  };

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  };

  return (
    <div className="App">
      <PostForm create = {createPost}/>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter={filter}
        setFilter={setFilter}
      />
      <PostList remove = {removePost} posts = {sortedAndSearchPosts} title = 'Посты про JS'/>
    </div>
  );
}

export default App;
