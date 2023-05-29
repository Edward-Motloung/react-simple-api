import { useEffect, useState} from 'react';
import './Paginator.modules.css';

export function Paginator(props: any) {

    const totalPages = props.totalRows / props.pageSize;
    const [pageLabels, setPageLabels]: any = useState([])
    let arr = new Array(totalPages).fill(null).map((_, i) => {
        let obj = {
            index: i + 1,
            label: i + 1,
            active: false
        };
        return obj
    });

    useEffect(() => {
        arr[0].active = true;
        setPageLabels(arr);
    }, [totalPages])

    //need to finish off styling
    const goToPage = (pageNumber: number) => {
        props.goto(pageNumber);
        
        arr.map((label: any, index: number) => {
            // console.log(label.index === pageNumber)
            if (label.index === pageNumber) {
                label.active = true;
            } else {
                label.active = false;
            }
        })
        setPageLabels(arr);
    }

    return (
        <nav aria-label="Page navigation" className="d-flex justify-content-end">
            <ul className="pagination">
                {
                    pageLabels.map((pageLabelObj: any, index: number) => (
                        <li
                            key={index}
                            onClick={e => goToPage(pageLabelObj.index)}
                            aria-current="page"
                            className={` ${pageLabelObj.active ? 'page-link--active': ''} page-item`}
                            role="button">
                            <span className={` ${pageLabelObj.active ? 'page-link--active': ''} page-link`}>
                                {pageLabelObj.label}
                            </span>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
