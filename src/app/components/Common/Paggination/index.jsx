import React, { useState } from "react";
import KeyboardDoubleArrowLeftSharpIcon from "@mui/icons-material/KeyboardDoubleArrowLeftSharp";
import KeyboardArrowLeftSharpIcon from "@mui/icons-material/KeyboardArrowLeftSharp";
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import KeyboardDoubleArrowRightSharpIcon from "@mui/icons-material/KeyboardDoubleArrowRightSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const [itemsPerPage, setItemsPerPage] = useState(6); // Default items per page
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const totalPagesInt = Math.max(Math.floor(totalPages), 1);

	if (isNaN(totalPages) || totalPages < 1) {
		return null;
	}

	const renderPageNumbers = () => {
		const maxVisibleButtons = 6;
		const pageNumbers = [];
		let start = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
		let end = Math.min(totalPagesInt, start + maxVisibleButtons - 1);

		if (end - start < maxVisibleButtons - 1) {
			start = Math.max(1, end - maxVisibleButtons + 1);
		}

		if (start > 1) {
			pageNumbers.push(
				<div
					key="start-ellipsis"
					className="bg-[#FFFFFF] border-[1px] border-[#E1E4EA] h-[4vh] flex justify-center items-center w-[6vw] sm:w-[4vw] lg:w-[3vw] rounded-md cursor-pointer text-center"
				>
					&#8230;
				</div>
			);
		}

		for (let i = start; i <= end; i++) {
			pageNumbers.push(
				<div
					key={i}
					className={`bg-[#FFFFFF] border-[1px] border-[#E1E4EA] h-[4vh] flex justify-center items-center w-[6vw] sm:w-[4vw] lg:w-[3vw] rounded-md cursor-pointer ${
						currentPage === i
							? "border-[#FF387A] border-[2px] text-[#171717]"
							: ""
					}`}
					onClick={() => onPageChange(i)}
				>
					{i}
				</div>
			);
		}

		if (end < totalPagesInt) {
			pageNumbers.push(
				<div
					key="end-ellipsis"
					className="bg-[#FFFFFF] border-[1px] border-[#E1E4EA] h-[4vh] flex justify-center items-center w-[6vw] sm:w-[4vw] lg:w-[3vw] rounded-md cursor-pointer text-center"
				>
					&#8230;
				</div>
			);
			pageNumbers.push(
				<div
					key={totalPagesInt}
					className={`bg-[#FFFFFF] border-[1px] border-[#E1E4EA] h-[4vh] flex justify-center items-center w-[6vw] sm:w-[4vw] lg:w-[3vw] rounded-md cursor-pointer ${
						currentPage === totalPagesInt
							? "border-[#FF387A] border-[2px] text-[#171717]"
							: ""
					}`}
					onClick={() => onPageChange(totalPagesInt)}
				>
					{totalPagesInt}
				</div>
			);
		}

		return pageNumbers;
	};

	const handleDropdownToggle = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleItemsPerPageChange = (value) => {
		setItemsPerPage(value);
		setIsDropdownOpen(false);
		// Trigger any action needed for items per page change
	};

	return (
		<div className="flex items-center justify-between p-[3vw] mt-10 gap-[1vw]">
			<span className="text-sm text-gray-700 w-[150px] md:block hidden">
				Page {currentPage} of {totalPages}
			</span>
			<section className="flex w-full items-center justify-center gap-[1vw]">
				<figure className="flex gap-[1vw] mr-[2vw]">
					<KeyboardDoubleArrowLeftSharpIcon
						className="sm:hidden hidden lg:block cursor-pointer"
						onClick={() => onPageChange(1)}
					/>
					<KeyboardArrowLeftSharpIcon
						className="cursor-pointer"
						onClick={() => onPageChange(Math.max(1, currentPage - 1))}
					/>
				</figure>
				<div className="flex justify-center items-center gap-[0.5vw]">
					{renderPageNumbers()}
				</div>
				<figure className="flex gap-[1vw] ml-[2vw]">
					<KeyboardArrowRightSharpIcon
						className="cursor-pointer"
						onClick={() =>
							onPageChange(Math.min(totalPagesInt, currentPage + 1))
						}
					/>
					<KeyboardDoubleArrowRightSharpIcon
						className="sm:hidden hidden lg:block cursor-pointer"
						onClick={() => onPageChange(totalPagesInt)}
					/>
				</figure>
			</section>
			<div className="relative text-sm text-gray-700 w-[150px] md:block hidden">
				<span
					className="cursor-pointer flex items-center"
					onClick={handleDropdownToggle}
				>
					{itemsPerPage} / Page{" "}
					<KeyboardArrowDownIcon className="text-gray-600" />
				</span>
				{isDropdownOpen && (
					<div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
						{[6, 12, 24, 48].map((value) => (
							<div
								key={value}
								className={`p-2 cursor-pointer ${
									itemsPerPage === value ? "bg-gray-200" : ""
								}`}
								onClick={() => handleItemsPerPageChange(value)}
							>
								{value} / Page
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Pagination;
