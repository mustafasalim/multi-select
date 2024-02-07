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

  // user data içeriği
  const data = useSelector((state: RootState) => state.dataContext.data)
  // Seçilen kullanıcıların verilerini saklamak için bir state oluştur
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])
  return (
    <>
      <section className="flex items-center justify-center mt-56">
        <MultiSelect
          label="Select domato,patoto ...."
          data={data}
          placholder="Search hupplies"
          searchValue={selectedUsers}
          onSearchChange={setSelectedUsers}
        />
      </section>
    </>
  )
}

export default App
