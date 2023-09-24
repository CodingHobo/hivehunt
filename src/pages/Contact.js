import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";

function Contact() {
  const [ message, setMessage ] = useState('');
  const [ owner, setOwner ] = useState(null);
  const [ searchParams, setSearchParams ] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", params.ownerId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setOwner(docSnapshot.data());
      } else {
        toast.error("Could not find owner info")
      }
    }
    getOwner();
  }, [ params.ownerId ])

  const onChange = e => setMessage(e.target.value)


  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Owner</p>
      </header>

      {owner !== null && (
        <main>
          <div className="contactOwner">
            <p className="ownerName">Contact {owner?.name}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">Message</label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                velue={message}
                onChange={onChange}
              >
              </textarea>
            </div>

            <a
              href={`mailto:${owner.email}?Subject=${searchParams.get("listingName")}&body=${message}`}
              target="_blank"
              rel="noreferrer"
            >
              <button type="button" className="primaryButton">Send message</button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}
export default Contact