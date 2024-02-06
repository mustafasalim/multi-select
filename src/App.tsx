import { useEffect } from "react"
import SelectUsers from "./components/selectRick"
import { fetchUserData } from "./store/data"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "./store"
import { RootState } from "./store"

function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])
  const data = useSelector((state: RootState) => state.dataContext.data)

  return (
    <>
      <section className="flex items-center justify-center mt-56">
        <div className="grid gap-y-4 ">
          <div className="text-center font-semibold text-[#475569]">
            Multiple selection, selecting from existing items.
          </div>
          <SelectUsers data={data} />
        </div>
      </section>
    </>
  )
}

export default App
