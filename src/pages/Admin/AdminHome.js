import React from 'react'
import Layout from '../../components/shared/Layouts/Layout'
import { useSelector } from 'react-redux'

const AdminHome = () => {
    const {user} = useSelector(state => state.auth)
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
            <h1>Welcome Admin <i className='text-success'>{user?.name}</i></h1>
            <h3>Manage Blood Bank App</h3>
            <hr />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sapiente autem, recusandae magnam sit magni! Ipsa sunt, nobis quod in voluptas repudiandae neque nihil ut cum dicta eum pariatur, temporibus dolorem eveniet, blanditiis deleniti error animi iusto magni asperiores ullam fugit. Totam sequi corporis voluptatem soluta ipsum repudiandae autem? Maiores vero, nobis dicta odit rerum porro non sint ullam tempore nemo labore architecto nihil voluptates voluptatibus corrupti vel repudiandae molestiae repellendus, rem laudantium consequuntur id illo. Tempora deserunt error dolores, eum amet obcaecati ad nobis incidunt dignissimos accusantium quos corrupti unde modi, perferendis neque nam. Totam exercitationem illo soluta nesciunt repellat magni commodi repellendus? Animi, tenetur id. Aperiam mollitia perferendis eos tempore cum quae labore autem nulla aliquam iste tenetur, numquam voluptatibus pariatur hic ab ea. Repellendus aspernatur aperiam ratione! Hic nostrum excepturi quidem repudiandae nisi deserunt! Est, soluta? Similique enim dicta, excepturi nam reprehenderit porro earum qui dolorem vel possimus facere. Pariatur labore odit ex rem non enim harum ipsa nihil! Distinctio veritatis ipsam eum ab laudantium fuga sit neque quos consequatur sunt non quia ipsum nihil, nam id ad? Quae fugit accusantium qui repudiandae veniam consectetur, facere vitae molestiae, eum amet reprehenderit ut laborum praesentium eaque porro optio.
            </p>
        </div>
      </div>
    </Layout>
  )
}

export default AdminHome
