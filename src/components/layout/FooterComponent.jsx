import { Footer } from "flowbite-react"

const FooterComponent = () => {
  return (
    <Footer container>
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
      <Footer.Copyright
        href="#"
        by="Ali Shoddiqien™"
        year={new Date().getFullYear()}
      />
    </Footer>
  )
}
export default FooterComponent