import { useEffect, useRef, useState } from "react"
import { TiArrowSortedUp } from "react-icons/ti"
import { IoMdClose } from "react-icons/io"
import { motion } from "framer-motion"

function SelectUsers(props: any) {
  //veri tabanından kullanıcı bilgilerini getirir
  const { data } = props

  // Seçilen kullanıcıların verilerini saklamak için bir durum tanımla
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])

  // Kullanıcıyı seçme işlemi
  const handleUserSelect = (user: any) => {
    // Eğer kullanıcı zaten seçili ise listeden çıkar
    if (selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      )
    } else {
      // Değilse listeye ekle
      setSelectedUsers([...selectedUsers, user])
    }
  }

  //statei false ise true true ise false olarak gunceller
  const [arrow, setArrow] = useState(false)
  const handleArrow = () => {
    if (arrow === false) {
      setArrow(true)
    } else {
      setArrow(false)
    }
  }

  const containerRef = useRef<HTMLDivElement>(null)
  //kullanıcıların oldugu bölümün dışına tıklandıgında kapanan function
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

  console.log(arrow)

  console.log(selectedUsers)

  return (
    <div
      ref={containerRef}
      className="grid gap-y-6"
    >
      <div
        onClick={handleArrow}
        className=" min-h-[66px]  relative flex rounded-2xl border-2 p-2 border-[#a7b7cc] shadow-lg"
      >
        <div className="  flex items-center gap-y-2 flex-wrap max-w-[500px]  gap-x-2 ">
          {selectedUsers.map((user: any) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 2 }}
            >
              <div className="flex justify-between items-center gap-x-2 px-4 p-2 rounded-2xl bg-[#E2E8F0]">
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
        <input
          placeholder={selectedUsers.length > 0 ? "" : "select users"}
          onClick={handleArrow}
          className="h-full rounded-xl px-4 overflow-hidden  outline-none "
          type="text"
        />

        <TiArrowSortedUp
          onClick={handleArrow}
          className={` h-full absolute top-0 right-0   transform-gpu mr-2 transition-all duration-300 w-6 ${
            arrow === true && "rotate-180"
          } text-[#475569] cursor-pointer`}
        />
      </div>

      {arrow === true && (
        <motion.div
          initial={{ opacity: -1 }}
          animate={{ opacity: 2 }}
        >
          <div className=" overflow-hidden ease-in-out rounded-s-2xl  h-[500px] border-2 overflow-y-scroll transition-all custom-scrollbar border-[#a7b7cc]">
            {data.length === 0 ? (
              <div>fwafw</div>
            ) : (
              <>
                {data.results.map((user: any, idx: any) => (
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
                      checked={selectedUsers.some(
                        (selectedUser) => selectedUser.id === user.id
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
                      <div className="text-[17px] text-[#475569] font-semibold">
                        {user.name}
                      </div>
                      <div className="text-[15px] text-[#808da0] font-semibold">
                        {user.episode.length} episode
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

export default SelectUsers
