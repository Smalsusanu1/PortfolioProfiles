import * as React from 'react';
export default function MyTable(){
    return(
        <div className="table w-full p-2">
        <table className="w-full border">
            <thead>
                <tr className="bg-gray-50 border-b">
                    <th className="border-r p-2">
                        <input type="checkbox"/>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            ID
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            Name
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            Email
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            Address
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </th>
                    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                        <div className="flex items-center justify-center">
                            Action
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                            </svg>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-gray-50 text-center">
                    <td className="p-2 border-r">
                        
                    </td>
                    <td className="p-2 border-r">
                        <input type="text" className="border p-1"/>
                    </td>
                    <td className="p-2 border-r">
                        <input type="text" className="border p-1"/>
                    </td>
                    <td className="p-2 border-r">
                        <input type="text" className="border p-1"/>
                    </td>
                    <td className="p-2 border-r">
                        <input type="text" className="border p-1"/>
                    </td>
                    <td className="p-2">
                        <input type="text" className="border p-1"/>
                    </td>
                    
                    
                </tr>
                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                    <td className="p-2 border-r">
                        <input type="checkbox"/>
                    </td>
                    <td className="p-2 border-r">1</td>
                    <td className="p-2 border-r">John Doe</td>
                    <td className="p-2 border-r">john@gmail.com</td>
                    <td className="p-2 border-r">Sydney, Australia</td>
                    <td>
                        <a href="#" className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin">Edit</a>
                        <a href="#" className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin">Remove</a>
                    </td>
                </tr>
                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                    <td className="p-2 border-r">
                        <input type="checkbox"/>
                    </td>
                    <td className="p-2 border-r">2</td>
                    <td className="p-2 border-r">Adam Smith</td>
                    <td className="p-2 border-r">adam@gmail.com</td>
                    <td className="p-2 border-r">Sydney, Australia</td>
                    <td>
                        <a href="#" className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin">Edit</a>
                        <a href="#" className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin">Remove</a>
                    </td>
                </tr>
                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                    <td className="p-2 border-r">
                        <input type="checkbox"/>
                    </td>
                    <td className="p-2 border-r">3</td>
                    <td className="p-2 border-r">Jean Doe</td>
                    <td className="p-2 border-r">jean@gmail.com</td>
                    <td className="p-2 border-r">Sydney, Australia</td>
                    <td>
                        <a href="#" className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin">Edit</a>
                        <a href="#" className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin">Remove</a>
                    </td>
                </tr>
                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                    <td className="p-2 border-r">
                        <input type="checkbox"/>
                    </td>
                    <td className="p-2 border-r">3</td>
                    <td className="p-2 border-r">Jean Doe</td>
                    <td className="p-2 border-r">jean@gmail.com</td>
                    <td className="p-2 border-r">Sydney, Australia</td>
                    <td>
                        <a href="#" className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin">Edit</a>
                        <a href="#" className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin">Remove</a>
                    </td>
                </tr>
                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                    <td className="p-2 border-r">
                        <input type="checkbox"/>
                    </td>
                    <td className="p-2 border-r">3</td>
                    <td className="p-2 border-r">Jean Doe</td>
                    <td className="p-2 border-r">jean@gmail.com</td>
                    <td className="p-2 border-r">Sydney, Australia</td>
                    <td>
                        <a href="#" className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin">Edit</a>
                        <a href="#" className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin">Remove</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    )
}