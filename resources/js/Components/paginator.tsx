import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/Components/ui/pagination";
import { cn } from "@/lib/utils";
import { PaginationMeta } from "@/types";

interface Props {
    meta: PaginationMeta;
    onPreviousPage?: () => void;
    onNextPage?: () => void;
    nextLink?: string;
    previousLink?: string;
}

const Paginator = ({
    meta,
    onNextPage,
    onPreviousPage,
    nextLink = "#",
    previousLink = "#",
}: Props) => {
    const { current_page, last_page, total } = meta;
    const hasPrev = current_page > 1;
    const hasNext = current_page < last_page;

    return (
        <div className="flex flex-wrap items-center justify-center gap-x-8 my-4">
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 flex gap-x-1 items-center">
                    <span>Showing page</span>
                    <span className="font-semibold">{current_page}</span>
                    <span>of</span>
                    <span className="font-semibold">{last_page}</span>
                    <span>&middot;</span>
                    <span>Total</span>
                    <span className="font-semibold">{total}</span>
                    <span>results.</span>
                </span>
            </div>

            <div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                aria-disabled={!hasPrev}
                                href={previousLink}
                                className={cn({
                                    "cursor-not-allowed": !hasPrev,
                                })}
                                onClick={(e) => {
                                    if (!hasPrev) {
                                        e.preventDefault();
                                        return;
                                    }

                                    if (onPreviousPage) {
                                        e.preventDefault();
                                        return onPreviousPage();
                                    }
                                }}
                            />
                        </PaginationItem>

                        {/* <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem> */}

                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                {current_page}
                            </PaginationLink>
                        </PaginationItem>
                        {/* <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem> */}
                        {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}

                        <PaginationItem>
                            <PaginationNext
                                href={nextLink}
                                className={cn({
                                    "cursor-not-allowed": !hasNext,
                                })}
                                onClick={(e) => {
                                    if (!hasNext) {
                                        e.preventDefault();
                                        return;
                                    }
                                    if (onNextPage) {
                                        e.preventDefault();
                                        return onNextPage();
                                    }
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default Paginator;
