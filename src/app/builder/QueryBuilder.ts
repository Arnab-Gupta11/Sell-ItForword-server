/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  //Search
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  //Filter
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      'searchTerm',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
      'minPrice',
      'maxPrice',
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    const filterQuery: Record<string, any> = {}; // Use Record<string, any> to avoid type errors

    // Convert filters properly
    Object.keys(queryObj).forEach((key) => {
      if (Array.isArray(queryObj[key])) {
        // If the field is an array (e.g., category), use $in
        filterQuery[key] = { $in: queryObj[key] };
      } else {
        // Otherwise, use an exact match
        filterQuery[key] = queryObj[key];
      }
    });

    this.modelQuery = this.modelQuery.find(filterQuery as FilterQuery<T>);
    return this;
  }

  //Sorting
  sort() {
    const sort =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }
  //Sort by order
  sortOrder() {
    const sortOrder = this?.query?.sortOrder;
    const sortBy = this?.query?.sortBy;
    if (sortOrder === 'asc') {
      this.modelQuery = this.modelQuery.sort(`${sortBy}`);
    } else if (sortOrder === 'desc') {
      this.modelQuery = this.modelQuery.sort(`-${sortBy}`);
    }
    return this;
  }
  //Filter by Price
  filterByPrice(maxProductPrice: number) {
    const minPrice = Number(this?.query?.minPrice);
    const maxPrice = Number(this?.query?.maxPrice);
    this.modelQuery = this.modelQuery.find({
      price: { $gte: minPrice || 0, $lte: maxPrice || maxProductPrice },
    });

    return this;
  }
  //Paginate
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 9;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 9;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}
export default QueryBuilder;
