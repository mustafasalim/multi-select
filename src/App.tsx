import { useEffect } from "react"
import SelectUsers from "./components/selectRick"
import { fetchUserData } from "./store/data"
import { useDispatch } from "react-redux"
import { AppDispatch } from "./store"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  return (
    <>
      <section className="flex items-center justify-center h-screen">
        <SelectUsers />
      </section>
    </>
  )
}

export default App
