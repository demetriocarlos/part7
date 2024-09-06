 import { Link } from "react-router-dom"
 import { User } from "lucide-react"


// eslint-disable-next-line react/prop-types
export const UserLink = ({createdBy,createdById}) => {
  return (
    <div> 
        <Link to={`/userBlogs/${createdById}`}>
          <div className=' hover:text-indigo-500 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out     flex items-center text-sm text-gray-600 mb-4'>
              <User className="w-4 h-4 mr-1" />
              <span>{createdBy}</span>
          </div>
        </Link>
    </div>
  )
}
