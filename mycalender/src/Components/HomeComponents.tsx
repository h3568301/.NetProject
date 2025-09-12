import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const HomeComponents = (props: Props) => {
    const navigate = useNavigate();
    return (
        <div className="pt-16">
            <div className="bg-gradient-to-r  py-12">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        Manage Your Events
                    </h2>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button 
                            onClick={() => navigate("/createEvent")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Create New Event
                        </button>
                        
                        <button 
                            onClick={() => navigate("/event")}
                            className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 px-8 py-4 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            Check Events
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeComponents