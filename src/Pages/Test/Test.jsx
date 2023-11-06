import { CircularProgress } from "@mui/material"
import { useGetAllUsersQuery } from "../../api/users"

const Test = () => {
    const { isError, isFetching, data } = useGetAllUsersQuery()

    return (
        <div>
            {isError ? (
                <>Что-то пошло не так, обновите страницу или попробуйте позднее</>
            ) : isFetching ? (
                <CircularProgress />
            ) : data ? (
                <>
                    <h1>Пользователи</h1>
                    {data.map((user) => (
                        <div key={user.id}>{user.name}</div>
                        
                    ))}
                </>
            ) : null}
        </div>
    )
}
export default Test