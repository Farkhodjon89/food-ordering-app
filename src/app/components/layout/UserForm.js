"use client"
import { useState, useEffect } from "react"
import EditableLink from "./EditableImage"
import useProfile from "../useProfile"
import AddressInputs from "./AddressInputs"

export default function UserForm({ user, session, onSave }) {
    const [userName, setUserName] = useState('')
    const [phone, setPhone] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [admin, setAdmin] = useState(false)
    const userImage = session?.data?.user.image
    const {data: loggedInUserData} = useProfile()
      
    useEffect(() => {
      if (user) {
          setUserName(user.name || '')
          setPhone(user.phone || '')
          setPostalCode(user.postalCode || '')
          setStreetAddress(user.streetAddress || '')
          setCity(user.city || '')
          setCountry(user.country || '')
          setAdmin(user.admin || false)
      }
    }, [user])

    function handleAddressChange(propName, value) {
      if (propName === 'city') setCity(value)
      if (propName === 'phone') setPhone(value)
      if (propName === 'postalCode') setPostalCode(value)
      if (propName === 'country') setCountry(value)
      if (propName === 'streetAddress') setStreetAddress(value)
  }
    
    return (
        <div className="md:flex gap-4">
                    <div className="md:w-1/4">
                      <div className="p-2 rounded-lg relative">
                            <EditableLink link={userImage} />
                      </div>
                    </div>
                    <form 
                      className="grow md:w-3/4" 
                      onSubmit={(e) => onSave(e, {
                        name: userName, phone, postalCode, streetAddress, city, country
                      })}
                    >
                        <label>First and Last name</label>
                        <input 
                           type="text" 
                           placeholder="First and Last name"
                           value={userName} 
                           onChange={e => setUserName(e.target.value)}
                         />
                        <label>Email</label>
                        <input type="email" disabled value={session?.data?.user.email} />
                        <AddressInputs 
                           addressProps={{
                             phone, postalCode, city, country, streetAddress
                           }} 
                           setAddressProp={handleAddressChange}
                        />
                        {loggedInUserData.admin && (
                          <div>
                            <label 
                              className="p-2 inline-flex items-center gap-2 mb-2" 
                              htmlFor="admin"
                            >
                               <input 
                                 checked={admin} 
                                 id="admin" 
                                 type="checkbox"
                                 value={'1'}
                                 onChange={e => setAdmin(e.target.checked)}
                                />
                               <span>Admin</span>
                            </label>
                        </div>
                        )}
                        <button type="submit">Save</button>
                    </form>
        </div>
    )
}