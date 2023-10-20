import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


const useFetch = (url) => {
    const [data, setData] = useState(null)

    const getData = async () => {
        try {
            const res = await fetch(url)
            const data = await res.json()
            setData(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])
  return [data]
}

export default useFetch