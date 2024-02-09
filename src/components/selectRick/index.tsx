import { useEffect, useRef, useState } from "react"
import { TiArrowSortedUp } from "react-icons/ti"
import { IoMdClose } from "react-icons/io"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store"
import { _searchContext } from "../../store/search"

interface MultiSelectProps {
  label: string
  data: any
  placholder: string
  searchValue: any
  onSearchChange: any
  maxSelectedValues: number
}
function MultiSelect({
  label,
  data,
  placholder,
  searchValue,
  onSearchChange,
  maxSelectedValues,
}: MultiSelectProps) {
  //sends the value in the input to the search stat
  const handleSearchChange = (event: any) => {
    dispatch(_searchContext(event.target.value.toLowerCase().trim()))
  }

  //retrieves the current search value
  const dispatch = useDispatch<AppDispatch>()
  const search = useSelector((state: any) => state.searchSlice.value)

  //filters the search value with data
  const handleSearch =
    data.results &&
    data.results.filter((item: any) => {
      return search.toLowerCase === ""
        ? item
        : item.name.toLowerCase().includes(search)
    })

  //updates selected data
  const [maxValue, setMaxValue] = useState(false)
  const handleUserSelect = (user: any) => {
    if (searchValue.some((selectedUser: any) => selectedUser.id === user.id)) {
      onSearchChange(
        searchValue.filter((selectedUser: any) => selectedUser.id !== user.id)
      )
    } else if (searchValue.length < maxSelectedValues) {
      // Değilse listeye ekle
      onSearchChange([...searchValue, user])
    } else {
      searchValue.length < maxSelectedValues
      setMaxValue(true)
      setTimeout(() => {
        setMaxValue(false)
      }, 2000)
    }
  }
  console.log(maxValue)
  console.log("items", searchValue)

  //multiselect on/off operation
  const [arrow, setArrow] = useState(false)
  const handleArrow = () => {
    if (arrow === false) {
      setArrow(true)
    } else {
      setArrow(false)
    }
  }

  //function that works when clicked outside the box
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleClick = (event: any) => {
      const path = (event.composedPath && event.composedPath()) || []
      if (!path.includes(containerRef.current)) {
        setArrow(false)
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="grid gap-y-2"
    >
      <div className="text-[16px] font-semibold text-[#475569]">{label}</div>
      {/* search section */}
      <div
        onClick={handleArrow}
        className="w-[550px] min-h-[66px]  relative rounded-2xl border-2 p-2 border-[#a7b7cc] shadow-lg"
      >
        <div className="  flex items-center gap-y-2 flex-wrap max-w-[500px]  gap-x-2 ">
          {searchValue.map((user: any) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 2 }}
            >
              <div
                onClick={(event) => event.stopPropagation()}
                className="flex justify-between items-center gap-x-2 px-4 p-2 rounded-2xl bg-[#E2E8F0]"
              >
                <span className="text-[#475569] font-semibold">
                  {user.name}
                </span>
                <button
                  onClick={() => handleUserSelect(user)}
                  className="w-[30px] h-[30px] bg-[#a0a9b4] hover:bg-red-500 transition-colors flex items-center justify-center rounded-lg"
                >
                  <IoMdClose className="text-white text-[24px] " />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        {maxValue === true && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
          >
            <div className="p-2 text-red-500">
              you can choose up to {maxSelectedValues} values
            </div>
          </motion.div>
        )}
        <input
          onClick={(event) => event.stopPropagation()}
          onChange={handleSearchChange}
          placeholder={placholder}
          onFocus={() => setArrow(true)}
          className="w-full p-2 mt-1 rounded-xl px-4 overflow-hidden  outline-none "
          type="text"
        />

        <TiArrowSortedUp
          onClick={handleArrow}
          className={` h-full  absolute top-0 right-0   transform-gpu mr-2 transition-all duration-300 w-6 ${
            arrow === true && "rotate-180"
          } text-[#475569] cursor-pointer`}
        />
      </div>

      {arrow === true && (
        //data section
        <motion.div
          initial={{ opacity: -1 }}
          animate={{ opacity: 2 }}
        >
          <div className=" overflow-hidden ease-in-out rounded-s-2xl  h-[500px] border-2 overflow-y-scroll transition-all custom-scrollbar border-[#a7b7cc]">
            {data.length === 0 ? (
              <div>fwafw</div>
            ) : (
              <>
                {handleSearch.length === 0 && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-[18px] text-[#475569] font-semibold">
                      No Data
                    </div>
                  </div>
                )}
                {handleSearch.map((user: any, idx: any) => (
                  <div
                    onClick={() => handleUserSelect(user)}
                    key={idx}
                    className="flex cursor-pointer p-2 gap-x-3 border-b-2 bg-[#fcfdfd] border-[#a7b7cc]"
                  >
                    <input
                      className="cursor-pointer ease-out transition-all z-10 w-4 accent-blue-500  outline-[#a7b7cc] outline-2 pointer-events-auto"
                      type="checkbox"
                      // Checkbox'un durumunu checked prop ile kontrol et
                      // Eğer kullanıcı seçili ise, true dönecek
                      checked={searchValue.some(
                        (selectedUser: any) => selectedUser.id === user.id
                      )}
                      // Checkbox'a tıklandığında ilgili kullanıcı nesnesini seçme fonksiyonuna gönder
                      onChange={() => handleUserSelect(user)}
                    />
                    <div className="w-12 h-12 rounded-md overflow-hidden">
                      <img
                        className="object-cover"
                        src={user.image}
                        alt=""
                      />
                    </div>
                    <div className="grid">
                      <div
                        className={`text-[17px] text-[#475569] font-semibold ${
                          search === user.name ? "font-bold" : ""
                        }`}
                      >
                        {handleSearch.length > 0 && user.name}
                      </div>

                      <div className="text-[15px] text-[#808da0] font-semibold">
                        {user.episode ? user.episode.length + "episode" : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default MultiSelect
