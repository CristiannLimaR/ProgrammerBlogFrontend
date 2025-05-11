import { PostCard } from './PostCard'

export function PostList({ 
  posts, 
  expandedPost, 
  setExpandedPost,
  selectedCourse,
  courses 
}) {
  console.log(posts)
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm p-4 border-b z-10">
        <h2 className="text-xl font-bold">
          {selectedCourse === 'all' ? 'Publicaciones recientes' : 
            courses.find(c => c.id === selectedCourse)?.name || 'Publicaciones'}
        </h2>
      </div>
      
      <div className="divide-y">
        {posts.map(post => (
          <PostCard 
            key={post._id}
            post={post}
            expandedPost={expandedPost}
            setExpandedPost={setExpandedPost}
          />
        ))}
      </div>
    </div>
  )
} 