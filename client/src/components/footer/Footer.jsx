import './footer.css'
export default function Footer() {
  const current = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  const date = current.getFullYear()
  return (
    <div className="wrapper footer">
      <div className="container-80 margin-auto">
        <span>Hôtel de ville de KINSHASA &copy; {date} Tous droits réservés.</span>
      </div>
    </div>
  )
}
