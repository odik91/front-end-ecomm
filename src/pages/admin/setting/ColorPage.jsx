/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userNavigation } from "../../../features/user/userSlice"
import { ColorTable, Loading } from "../../../components";
import { Card } from "flowbite-react";
import { getColor } from "../../../features/color/colorSlice";

const ColorPage = () => {
  const { is_loading, colors } = useSelector((store) => store.colors);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      userNavigation({
        current_parent: "pengaturan",
        link: "/setting",
        active_page: "warna",
      })
    );

    dispatch(getColor())
  }, [])
  return (
    <>
      {is_loading ? (
        <Loading />
      ) : (
        <article>
          <div className="p-4">
            <Card href="#" className="">
              <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                Kategori
              </h5>
              <hr />
              <ColorTable is_loading={is_loading} colors={colors} />
            </Card>
          </div>
        </article>
      )}
    </>
  );
}
export default ColorPage