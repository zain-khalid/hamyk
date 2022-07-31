import React, { useReducer, useEffect } from 'react'
import axios from 'axios'

const initialState = {
	Global_Paused: false,
	
}
 const reducer = (state, action) => {
	switch (action.type) {
		case 'true':
			return {
				Global_Paused:true
			}
		case 'false':
			return {
                                Global_Paused:false
				}
		default:
			return state
	}
}
export {
initialState,
reducer
}

// function UpdateGlobalPaused(key) { 
// // 	const [state, dispatch] = useReducer(reducer, initialState)

// // 	useEffect(() => {
		
                
// if(key===true){
//         dispatch({ type: 'true'})
//         console.log("pressed")

// }else{
//         dispatch({ type: 'false'})
 
// }


                
             
// // 	}, [])
// console.log(key)
// 	return null
// }

// export default UpdateGlobalPaused
