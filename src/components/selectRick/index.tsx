import { useState } from "react"
import { RootState } from "../../store"
import { TiArrowSortedUp } from "react-icons/ti"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"

function SelectUsers() {
  const data = useSelector((state: RootState) => state.dataContext.data)
  // Seçilen kullanıcıların verilerini saklamak için bir durum tanımla
  const [selectedUsers, setSelectedUsers] = useState<any[]>([])

  // Kullanıcıyı seçme işlemi
  const handleUserSelect = (user: any) => {
    // Eğer kullanıcı zaten seçili ise, listeden çıkar
    if (selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
      setSelectedUsers(
        selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
      )
    } else {
      // Değilse, listeye ekle
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const [arrow, setArrow] = useState(false)

  const handleArrow = () => {
    if (arrow === false) {
      setArrow(true)
    } else {
      setArrow(false)
    }
  }
  console.log(arrow)

  console.log(selectedUsers)

  return (
    <div className="grid gap-y-6">
      <div className="relative over">
        <input
          className="w-[400px] h-[50px] rounded-2xl border-2 overflow-hidden border-[#6e7e94] shadow-lg outline-none "
          type="text"
        />

        <TiArrowSortedUp
          onClick={handleArrow}
          className={`absolute h-full top-0 transform-gpu right-0 mr-2 transition-all duration-300 w-8 ${
            arrow === true && "rotate-180"
          } text-[#6e7e94] cursor-pointer`}
        />
      </div>
      {arrow === true && (
        <motion.div
          initial={{ opacity: -1 }}
          animate={{ opacity: 2 }}
        >
          <div className="w-[400px] overflow-hidden ease-in-out rounded-s-2xl  h-[500px] border-2 overflow-y-scroll transition-all custom-scrollbar border-[#6e7e94]">
            {data.length === 0 ? (
              <div>fwafw</div>
            ) : (
              <>
                {data.results.map((user: any, idx: any) => (
                  <div
                    key={idx}
                    className="flex p-2 gap-x-3 border-b-2 bg-[#fcfdfd] border-[#6e7e94]"
                  >
                    <input
                      className="cursor-pointer w-4"
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
                      <div className="text-[17px] text-[#475569] font-bold">
                        {user.name}
                      </div>
                      <div className="text-[15px] text-[#808da0] font-bold">
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
