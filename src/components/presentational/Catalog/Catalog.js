import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import BusinessCard from "../BusinessCard/BusinessCard";
import styles from "./Catalog.module.css";
import Select from "../Select/Select";
import Button from "../Button/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import SVGManager from "../../../svgs/svgs";

const Catalog = ({
	onFiltersSelected,
	onNeedMoreBusinesses,
	onInit,
	filters,
	categories,
	types,
	shouldDisplayFilters,
	businesses,
}) => {
	let [state, setState] = useState({
		category: -1,
		type: -1,
		sort: 0,
		pattern: "",
	});

	useEffect(() => {
		if (
			(!categories.content.length && !categories.isLoading) ||
			(!types.content.length && !types.isLoading)
		)
			onInit();
		
		setState(filters);
	}, [filters]);

	useEffect(() => {
		if (businesses.content.length < businesses.count && 
			onNeedMoreBusinesses // delete this if businesses loading failes
			)
			onNeedMoreBusinesses();
	}, []);

	function handleFiltersSubmitClick() {
		if (businesses.isLoading) return;
		// setState(Object.assign({}, state));
		onFiltersSelected(state);
		onNeedMoreBusinesses(0, state);
	}

	function handlePatternChange(e) {
		setState(Object.assign({}, state, { pattern: e.target.value }));
	}

	function handleCategorySelected(id) {
		setState(Object.assign({}, state, { category: id }));
	}

	function handleTypeSelected(id) {
		setState(Object.assign({}, state, { type: id }));
	}

	function handleSortSelected(id) {
		setState(Object.assign({}, state, { sort: id }));
	}

	return (
		<section className={"sectionDimensioned"}>
			<section className={[styles.catalogWrapper].join(" ")}>
				<h1 className={styles.catalogMainText}>CATALOG</h1>
			</section>
			{/* <div onClick={() => (onFiltersSelected(filters))} >WOW</div> */}
			{shouldDisplayFilters ? (
				<section>
					<div className={styles.filtersWrapper}>
						<section className={[styles.catalogWrapper].join(" ")}>
							<div className={styles.filtersSection}>
								{/* {businesses.isLoading && (
									<div className={"userActionLocker"}>
										{SVGManager.getSvg("lockerSvg")}
									</div>
								)} */}
								<div className={styles.searchInputWrapper}>
									<input
										placeholder={"Search..."}
										type={"text"}
										className={styles.searchInput}
										onChange={handlePatternChange}
										value={state.pattern}
									/>
									<svg
										className={styles.searchInputIcon}
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
											stroke="#7D7D7D"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										<path
											d="M17.5 17.5L13.875 13.875"
											stroke="#7D7D7D"
											strokeLinecap="square"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<div className={styles.filtersElement}>
									<Select
										content={"Category"}
										propsValues={categories.content.concat({
											id: -1,
											name: "All",
										})}
										onSelect={handleCategorySelected}
										wantToDisplayId={state.category}
									/>
								</div>
								<div className={styles.filtersElement}>
									<Select
										content={"Type"}
										propsValues={types.content.concat({
											id: -1,
											name: "All",
										})}
										onSelect={handleTypeSelected}
										wantToDisplayId={state.type}
									/>
								</div>
								<div className={styles.filtersElement}>
									<Select
										content={"Sort by"}
										propsValues={[
											{ id: 0, name: "New first" },
											{ id: 1, name: "Old first" },
											{ id: 2, name: "Popular" },
										]}
										onSelect={handleSortSelected}
										wantToDisplayId={state.sort}
									/>
								</div>
								<div className={[styles.filtersElement, styles.filtersElementButton].join(' ')}>
									<Button
										text={"Search"}
										onClick={handleFiltersSubmitClick}
										style={{height: '60px'}}
									/>
								</div>
							</div>
						</section>
					</div>
				</section>
			) : (
				<section>
					<div className={styles.filtersWrapper}>
						<section className={[styles.catalogWrapper].join(" ")}>
							<div className={styles.filtersSection}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className={styles.loading}
									width="50"
									height="50"
									viewBox="0 0 100 100"
									preserveAspectRatio="xMidYMid"
								>
									<path
										fill="none"
										stroke="#ff708b"
										stroke-width="10"
										stroke-dasharray="177.0463604736328 79.54256774902345"
										d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
										stroke-linecap="round"
									>
										<animate
											attributeName="stroke-dashoffset"
											repeatCount="indefinite"
											dur="0.9174311926605504s"
											keyTimes="0;1"
											values="0;256.58892822265625"
										></animate>
									</path>
								</svg>
							</div>
						</section>
					</div>
				</section>
			)}
			<div className={styles.catalogContent}>
				<section className={[styles.catalogWrapper].join(" ")}>
					<div className={styles.catalogBusinesses}>
						{(businesses.content.length >= businesses.count ||
							!businesses.needMore) &&
						categories.content.length &&
						types.content.length
							? businesses.content.map((e, i) => (
									<BusinessCard
										key={i}
										data={e}
										categories={categories}
										types={types}
									/>
							  ))
							: null}
					</div>
					{businesses.needMore && !businesses.isLoading ? (
						<div
							className={styles.catalogLoadEventTrigger}
							onClick={() => {
								onNeedMoreBusinesses();
							}}
						>
							<p>LOAD MORE</p>
						</div>
					) : businesses.needMore ? (
						<div className={styles.catalogLoadEventTrigger}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={styles.loading}
								width="100"
								height="100"
								viewBox="0 0 100 100"
								preserveAspectRatio="xMidYMid"
							>
								<path
									fill="none"
									stroke="#8676FF"
									stroke-width="10"
									stroke-dasharray="177.0463604736328 79.54256774902345"
									d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
									stroke-linecap="round"
								>
									<animate
										attributeName="stroke-dashoffset"
										repeatCount="indefinite"
										dur="0.9174311926605504s"
										keyTimes="0;1"
										values="0;256.58892822265625"
									></animate>
								</path>
							</svg>
						</div>
					) : !businesses.content.length ? (
						<div>
							<p className={styles.noCaseText}>
								No such business right now...
							</p>
							<div className={styles.noCaseButton}>
								<Link to={"/newPlan"}>
									<Button
										onClick={() => {}}
										text={"Create your own!"}
									/>
								</Link>
							</div>
						</div>
					) : null}
				</section>
			</div>
		</section>
	);
};

Catalog.propTypes = {
	onInit: PropTypes.func.isRequired,
	onFiltersSelected: PropTypes.func.isRequired,
	onNeedMoreBusinesses: PropTypes.func.isRequired,
	filters: PropTypes.object.isRequired,
	shouldDisplayFilters: PropTypes.bool.isRequired,
	businesses: PropTypes.object.isRequired,
	categories: PropTypes.object.isRequired,
	types: PropTypes.object.isRequired,
};

export default Catalog;
