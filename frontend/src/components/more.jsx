import { useState, useRef, useEffect, useContext } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import Axios from 'axios';
import { UserContext } from '../App';
const API = import.meta.env.VITE_SERVER_URL;

export default function DeleteButtonDropdown({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { token, setrRefreshVideos, refreshVideos } = useContext(UserContext)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Handle delete action
  const handleDelete = async (id) => {
    try {
      const res = await Axios.delete(`${API}/api/videos/${id}/delete`, {
        headers: { Authorization: `Bearer ${token}` }, // Headers
        withClimeentials: true, // Ensures cookies (if needed)
        validateStatus: function(status) {
            return true
        }
      })
      if (res.data.error) {
        alert(res.data.error)
      } if (res.data.message) {
        setrRefreshVideos(!refreshVideos)
        alert(res.data.message)
      }
    } catch(e) {
      console.error(e)
    }
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md bg-white flex items-center" ref={dropdownRef}>
        {/* Three dots menu button */}
        <button 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={toggleDropdown}
          aria-label="Options menu"
        >
          <MoreVertical size={20} />
        </button>
        
        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute right-0 bg-white rounded-md shadow-lg z-10 overflow-hidden border border-gray-200 animate-fade-in">
            <div>
              <button 
                className="w-full flex items-center px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors duration-150"
                onClick={() => handleDelete(id)}
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}