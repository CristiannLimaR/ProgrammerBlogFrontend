import { useSearchParams } from "react-router-dom";
import { FileJson, Terminal, Hammer } from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import { PostList } from "../components/posts/PostList";
import { usePosts } from "../shared/hooks/usePost";
import { parseISO, isToday, isThisWeek, isThisMonth } from 'date-fns';

export const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedPost, setExpandedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const selectedCourse = searchParams.get("course") || "all";
  const dateFilter = searchParams.get("date") || "all";
  const { getPosts } = usePosts();
  const setSelectedCourse = (course) => {
    searchParams.set("course", course);
    setSearchParams(searchParams);
  };

  const setDateFilter = (date) => {
    searchParams.set("date", date);
    setSearchParams(searchParams);
  };

  const fetchData = async () => {
    const PostsFromApi = await getPosts();
    if (PostsFromApi) {
      setPosts(PostsFromApi);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const courses = [
    { id: "Tech", name: "Tecnología", icon: <FileJson className="h-5 w-5" /> },
    { id: "Workshop", name: "Taller", icon: <Terminal className="h-5 w-5" /> },
    {
      id: "Practice",
      name: "Práctica Supervisada",
      icon: <Hammer className="h-5 w-5" />,
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCourse =
      selectedCourse === "all" || post.course === selectedCourse;
  
    const postDate = parseISO(post.createdAt);
  
    let matchesDate = true;
  
    if (dateFilter === "today") {
      matchesDate = isToday(postDate);
    } else if (dateFilter === "week") {
      matchesDate = isThisWeek(postDate, { weekStartsOn: 0 });
    } else if (dateFilter === "month") {
      matchesDate = isThisMonth(postDate);
    }
  
    return matchesCourse && matchesDate;
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        courses={courses}
      />

      <PostList
        posts={filteredPosts}
        expandedPost={expandedPost}
        setExpandedPost={setExpandedPost}
        selectedCourse={selectedCourse}
        courses={courses}
      />
    </div>
  );
};
