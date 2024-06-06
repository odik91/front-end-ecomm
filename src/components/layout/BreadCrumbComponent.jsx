import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { useSelector } from "react-redux";

const BreadCrumbComponent = () => {
  const { currentNavigation } = useSelector((store) => store.users);

  const { parent, parent_link, current_page } = currentNavigation;
  return (
    <div className="p-4 capitalize">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href={parent_link} icon={HiHome}>
          {parent}
        </Breadcrumb.Item>
        {parent !== current_page ? (
          <Breadcrumb.Item>{current_page}</Breadcrumb.Item>
        ) : (
          ""
        )}

        {/* <Breadcrumb.Item>Flowbite React</Breadcrumb.Item> */}
      </Breadcrumb>
    </div>
  );
};
export default BreadCrumbComponent;
