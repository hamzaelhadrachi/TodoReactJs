


function ListTodosComponent(){
    const targetDate = new Date((new Date()).getFullYear()+13,(new Date()).getMonth(),(new Date()).getDay());


    const todos = [{id: 1, description: 'learn Java 17',done:false,targetDate:targetDate},
                    {id: 2, description: 'learn DOCKER',done:false,targetDate:targetDate},
                    {id: 3, description: 'learn JENKINS',done:false,targetDate:targetDate}
                
                ]
    return(
        <div className="container">
            <h1>Things you'd like to do !</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <td><strong>ID</strong></td>
                            <td><strong>DESCRIPTION</strong></td>
                            <td><strong>DONE</strong></td>
                            <td><strong>TARGETDATE</strong></td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toDateString()}</td>
                                </tr>  
                            )
                        )
                    }
                    </tbody>
                </table>
            </div> 
        </div>
    )
}

export default ListTodosComponent;