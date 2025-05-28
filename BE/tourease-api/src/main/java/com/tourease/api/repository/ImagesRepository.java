package com.tourease.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tourease.api.entity.Images;
import com.tourease.api.entity.Invoice;


@Repository
public interface ImagesRepository extends JpaRepository<Images, Integer> {

}
