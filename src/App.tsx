import { useEffect, useState } from "react"
import MultiSelect from "./components/selectRick"
import { fetchUserData } from "./store/data"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "./store"
import { RootState } from "./store"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  // user data
  const data = useSelector((state: RootState) => state.dataContext.data.results)

  // Create a state to store data of selected users
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  return (
    <>
      <section className="flex items-center justify-center mt-24">
        <MultiSelect
          label="Selected users"
          data={data}
          maxSelectedValues={50}
          placholder="Search hupplies"
          searchValue={selectedUsers}
          onSearchChange={setSelectedUsers}
        />
      </section>
    </>
  )
}

export default App
