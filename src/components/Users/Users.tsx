import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { UserCard } from '../UserCard';
import { fetchUsers } from '../../services/UserService';
import { AxiosError } from 'axios';
import { IUser } from '../../interfaces/IUser'
import { Paginator } from '../Paginator'
import './Users.modules.css';


export function Users(props: any) {

    let defaultPageSize: number = 20;
    let defaultPageNumber: number = 1;

    const [pageSize, setPageSize] = useState(defaultPageSize)
    const [pageNumber, setPageNumber] = useState(defaultPageNumber)
    const [users, setUsers]: any = useState([])
    const [search, setSearch]: any = useState('')

    const { isLoading, data, isError, error, status } = useQuery(
        ['users', pageSize],
        fetchUsers
    );

    useEffect(() => {
        if (status === 'success') {
            setUsers(data?.data.items)
            setUsers(paginate(data?.data.items, pageNumber, defaultPageSize))
        }

    }, [data, status, defaultPageSize, pageNumber])

    if (isLoading) {
        return <h1>Loading ...</h1>
    }

    if (isError) {
        if (error instanceof AxiosError)
        return <h1>{error.message}</h1>
    }
    
    const gotoPage = (pageNumber: number) => {
        if (pageNumber) {
            setPageSize(pageNumber * defaultPageSize)
            setUsers(paginate(data?.data.items, pageNumber, defaultPageSize))
        }
    }

    function paginate(arr: any[], pageNumber: number, size: number): any[] {
        setPageNumber(pageNumber)
        let start, end;
        if (pageNumber) {
            end = pageNumber * size;
            start = end - size;
        } else {
            start = 0;
            end = size;
        }
        return arr.slice(start, end);
    }
    
    return (
        <div className="col-10 col-md-8 mx-auto">
            <h2 className="mt-4 mb-2">Lets find the Super Dev</h2>
            <div className="input-grossup mb-3 col-md-8 w-100">
                <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"/>
            </div>
            <div className="user-list__container d-flex col-md-8 w-100">
                <div className="user-list__wrapper w-100">
                    {
                        users.filter((item: IUser) => {
                            return search.toLowerCase() === '' 
                            ? item
                            : item.display_name.toLowerCase().includes(search)
                        }).map((userItem: IUser, i: number) => (
                            <div key={i}>
                                <UserCard user={userItem}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Paginator goto={gotoPage} totalRows='100' pageSize='20'/>
        </div>
    );
}